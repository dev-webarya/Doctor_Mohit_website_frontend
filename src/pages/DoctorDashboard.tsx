import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppData, type PrescriptionItem, MEDICATION_TIMING } from "@/store/AppDataContext";
import {
  parsePrescription,
  serializePrescription,
  formatPrescriptionForWhatsApp,
  createPrescriptionPdf,
  createPrescriptionPdfBlob,
} from "@/utils/prescription";
import { uploadFileForUrl, sendPrescriptionPdfDocument } from "@/lib/whatsappApi";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, Trash2, Send, FileText, User, Phone, CheckCircle, Download } from "lucide-react";

type StoredDoctor = {
  id: string;
  name: string;
};

const PATIENT_PREFIXES = ["Mr.", "Mrs.", "Ms.", "Miss", "Dr.", "Baby", "Master"];

const emptyMedication = (): PrescriptionItem => ({
  medicineName: "",
  dose: undefined,
  frequency: undefined,
  timesPerDay: undefined,
  durationDays: undefined,
  timing: undefined,
  description: undefined,
  notes: undefined,
});

const DoctorDashboard = () => {
  const { data, actions } = useAppData();
  const { toast } = useToast();
  const [sendingWa, setSendingWa] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<StoredDoctor | null>(null);
  const [prescriptions, setPrescriptions] = useState<
    Record<string, PrescriptionItem[]>
  >({});

  useEffect(() => {
    const raw = localStorage.getItem("carecure-current-doctor");
    if (!raw) return;
    try {
      setDoctor(JSON.parse(raw) as StoredDoctor);
    } catch {
      localStorage.removeItem("carecure-current-doctor");
    }
  }, []);

  const allAppts = data.appointments.filter((a) =>
    doctor ? a.doctorName.toLowerCase() === doctor.name.toLowerCase() : false,
  );
  const appts = allAppts.filter((a) => a.status === "scheduled" && !a.prescriptionSent);

  const getMedications = useCallback(
    (apptId: string): PrescriptionItem[] => {
      const cached = prescriptions[apptId];
      if (cached && cached.length > 0) return cached;
      const parsed = parsePrescription(
        data.appointments.find((a) => a.id === apptId)?.prescription,
      );
      if (parsed && parsed.length > 0) return parsed;
      return [emptyMedication()];
    },
    [data.appointments, prescriptions],
  );

  const updateMedications = (apptId: string, meds: PrescriptionItem[]) => {
    setPrescriptions((prev) => ({ ...prev, [apptId]: meds }));
  };

  const addMedication = (apptId: string) => {
    const meds = getMedications(apptId);
    updateMedications(apptId, [...meds, emptyMedication()]);
  };

  const removeMedication = (apptId: string, idx: number) => {
    const meds = getMedications(apptId).filter((_, i) => i !== idx);
    updateMedications(apptId, meds.length > 0 ? meds : [emptyMedication()]);
  };

  const updateMedicationField = (
    apptId: string,
    idx: number,
    field: keyof PrescriptionItem,
    value: string | number | undefined,
  ) => {
    const meds = [...getMedications(apptId)];
    if (!meds[idx]) return;
    meds[idx] = { ...meds[idx], [field]: value };
    updateMedications(apptId, meds);
  };

  const clearForm = (apptId: string) => {
    updateMedications(apptId, [emptyMedication()]);
  };

  const savePrescription = (apptId: string) => {
    const meds = getMedications(apptId);
    const valid = meds.filter((m) => m.medicineName?.trim());
    if (valid.length === 0) return;
    actions.updateAppointmentPrescription(apptId, serializePrescription(valid));
  };

  const sendViaWhatsApp = async (apptId: string) => {
    const appt = data.appointments.find((a) => a.id === apptId);
    const patient = appt ? data.patients.find((p) => p.id === appt.patientId) : undefined;
    if (!patient?.phone?.trim()) return;
    const meds = getMedications(apptId);
    const valid = meds.filter((m) => m.medicineName?.trim());
    if (valid.length === 0) return;
    savePrescription(apptId);
    const patientName = `${patient.firstName} ${patient.lastName}`.trim();
    const dateTime = appt ? `${appt.date} ${appt.time}` : new Date().toLocaleDateString();
    const docName = appt?.doctorName ?? doctor?.name ?? "Doctor";

    setSendingWa(apptId);

    const { blob, filename } = createPrescriptionPdfBlob(
      valid,
      docName,
      dateTime,
      patientName,
      appt?.patientPrefix,
      appt?.diagnosisSummary,
    );
    const pdfFile = new File([blob], filename, { type: "application/pdf" });
    const fullPrescriptionText = formatPrescriptionForWhatsApp(
      valid,
      docName,
      dateTime,
      patientName,
      appt?.patientPrefix,
      appt?.diagnosisSummary,
    );

    const upload = await uploadFileForUrl(pdfFile);
    if (upload.ok && upload.url) {
      const sent = await sendPrescriptionPdfDocument({
        to: patient.phone,
        documentUrl: upload.url,
        filename,
        caption: "Your prescription from Care & Cure Centre.",
      });
      if (sent.ok) {
        toast({
          title: "Prescription sent",
          description: "PDF prescription was sent to the patient's WhatsApp. No further action needed.",
        });
        actions.markPrescriptionSent(apptId);
        setSendingWa(null);
        return;
      }
    }

    const waPhone = patient.phone.replace(/\D/g, "").startsWith("91") ? patient.phone.replace(/\D/g, "") : `91${patient.phone.replace(/\D/g, "")}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(fullPrescriptionText)}`, "_blank", "noopener,noreferrer");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    const reason = !upload.ok ? upload.error : "API may not support document messages.";
    toast({
      title: "PDF not sent automatically",
      description: reason + " Patient chat opened with full prescription text — you can send as-is or attach the downloaded PDF.",
      variant: "destructive",
    });
    actions.markPrescriptionSent(apptId);
    setSendingWa(null);
  };


  const updatePrescriptionMeta = (apptId: string, meta: { diagnosisSummary?: string; patientPrefix?: string }) => {
    actions.updateAppointmentPrescriptionMeta(apptId, meta);
  };

  const logout = () => {
    localStorage.removeItem("carecure-current-doctor");
  };

  return (
    <Layout>
      <Helmet>
        <title>Doctor Dashboard | Care and Cure</title>
      </Helmet>
      <section className="pt-6 pb-10 bg-muted/50">
        <div className="container mx-auto container-padding space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold">Doctor Dashboard</h1>
              {doctor && (
                <p className="text-sm text-muted-foreground">
                  Signed in as {doctor.name}
                </p>
              )}
            </div>
            <Link to="/login/doctor">
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Verified Appointments</h2>
                  <p className="text-sm text-muted-foreground">
                    Add appointment summary and prescription. Save to patient dashboard, download PDF, or send via WhatsApp. Click &quot;Mark Appointment Complete&quot; when done—it will close from your dashboard.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {appts.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4">
                    No verified appointments. Appointments appear here after admin verification.
                  </p>
                )}
                {appts.map((a) => {
                  const patient = data.patients.find((p) => p.id === a.patientId);
                  const canEdit = true;
                  const meds = getMedications(a.id);
                  return (
                    <div
                      key={a.id}
                      className="rounded-xl border bg-card p-4 md:p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">
                              {patient
                                ? `${patient.firstName} ${patient.lastName}`
                                : "Unknown Patient"}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              {a.date} {a.time} • {a.reason || "General"}
                              {patient?.phone && (
                                <span className="flex items-center gap-1 text-primary">
                                  <Phone className="h-3.5 w-3" />
                                  {patient.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                          {a.status}
                        </span>
                      </div>

                      {(canEdit || a.appointmentSummary || a.diagnosisSummary || a.patientPrefix) && (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label>Appointment Summary</Label>
                            <Textarea
                              placeholder="Notes or summary for this appointment..."
                              value={a.appointmentSummary ?? ""}
                              onChange={(e) => actions.updateAppointmentSummary(a.id, e.target.value)}
                              disabled={!canEdit}
                              rows={2}
                              className="resize-none"
                            />
                          </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label>Patient Prefix</Label>
                            <select
                              className="h-10 w-full rounded-md border border-input bg-background px-3"
                              value={a.patientPrefix ?? ""}
                              onChange={(e) =>
                                updatePrescriptionMeta(a.id, {
                                  patientPrefix: e.target.value || undefined,
                                })
                              }
                              disabled={!canEdit}
                            >
                              <option value="">Select prefix</option>
                              {PATIENT_PREFIXES.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <Label>Diagnosis Summary</Label>
                            <Input
                              placeholder="e.g., Upper respiratory tract infection"
                              value={a.diagnosisSummary ?? ""}
                              onChange={(e) =>
                                updatePrescriptionMeta(a.id, {
                                  diagnosisSummary: e.target.value || undefined,
                                })
                              }
                              disabled={!canEdit}
                            />
                          </div>
                        </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-muted-foreground">
                            Medications
                          </h3>
                          {canEdit && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => addMedication(a.id)}
                              className="text-primary"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>

                        {meds.map((m, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border p-3 md:p-4 space-y-3 bg-muted/30"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">
                                Medication {idx + 1}
                              </span>
                              {canEdit && meds.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeMedication(a.id, idx)}
                                  aria-label="Remove medication"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div className="sm:col-span-2 space-y-1">
                                <Label>Medicine Name *</Label>
                                <Input
                                  placeholder="e.g., Amoxicillin"
                                  value={m.medicineName}
                                  onChange={(e) =>
                                    updateMedicationField(
                                      a.id,
                                      idx,
                                      "medicineName",
                                      e.target.value,
                                    )
                                  }
                                  disabled={!canEdit}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Dosage (optional)</Label>
                                <Input
                                  placeholder="e.g., 500mg"
                                  value={m.dose}
                                  onChange={(e) =>
                                    updateMedicationField(
                                      a.id,
                                      idx,
                                      "dose",
                                      e.target.value,
                                    )
                                  }
                                  disabled={!canEdit}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Frequency (optional)</Label>
                                <Input
                                  placeholder="e.g., Twice daily"
                                  value={m.frequency}
                                  onChange={(e) =>
                                    updateMedicationField(
                                      a.id,
                                      idx,
                                      "frequency",
                                      e.target.value,
                                    )
                                  }
                                  disabled={!canEdit}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Times per day (optional)</Label>
                                <Input
                                  type="number"
                                  min={1}
                                  max={12}
                                  placeholder="e.g., 2"
                                  value={m.timesPerDay ?? ""}
                                  onChange={(e) =>
                                    updateMedicationField(
                                      a.id,
                                      idx,
                                      "timesPerDay",
                                      e.target.value
                                        ? parseInt(e.target.value, 10)
                                        : undefined,
                                    )
                                  }
                                  disabled={!canEdit}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Duration (days) (optional)</Label>
                                <Input
                                  placeholder="e.g., 7"
                                  value={m.durationDays}
                                  onChange={(e) =>
                                    updateMedicationField(
                                      a.id,
                                      idx,
                                      "durationDays",
                                      e.target.value,
                                    )
                                  }
                                  disabled={!canEdit}
                                />
                              </div>
                              <div className="sm:col-span-2 space-y-1">
                                <Label>When to take (optional)</Label>
                                <Select
                                  value={m.timing ?? "__none__"}
                                  onValueChange={(val) =>
                                    updateMedicationField(a.id, idx, "timing", val === "__none__" ? undefined : val)
                                  }
                                  disabled={!canEdit}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select timing" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="__none__">Select timing</SelectItem>
                                    {MEDICATION_TIMING.map((t) => (
                                      <SelectItem key={t.value} value={t.value}>
                                        {t.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="sm:col-span-2 space-y-1">
                                <Label>Medicine Description (optional)</Label>
                                <Input
                                  placeholder="e.g., Antibiotic for infection"
                                  value={m.description ?? ""}
                                  onChange={(e) =>
                                    updateMedicationField(a.id, idx, "description", e.target.value || undefined)
                                  }
                                  disabled={!canEdit}
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label>Additional Notes (optional)</Label>
                              <Textarea
                                placeholder="Any special instructions or notes..."
                                value={m.notes ?? ""}
                                onChange={(e) =>
                                  updateMedicationField(
                                    a.id,
                                    idx,
                                    "notes",
                                    e.target.value,
                                  )
                                }
                                disabled={!canEdit}
                                rows={2}
                                className="resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {canEdit && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearForm(a.id)}
                            >
                              Clear
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => savePrescription(a.id)}
                            >
                              Save to Patient Dashboard
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const meds = getMedications(a.id).filter((m) => m.medicineName?.trim());
                                if (meds.length > 0) {
                                  savePrescription(a.id);
                                  const patientName = patient ? `${patient.firstName} ${patient.lastName}`.trim() : "Patient";
                                  createPrescriptionPdf(
                                    meds,
                                    a.doctorName ?? doctor?.name ?? "Doctor",
                                    `${a.date} ${a.time}`,
                                    patientName,
                                    a.patientPrefix,
                                    a.diagnosisSummary
                                  );
                                }
                              }}
                            >
                              <Download className="h-4 w-4 mr-1.5" />
                              Download PDF
                            </Button>
                            {patient?.phone && (
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
                                onClick={() => sendViaWhatsApp(a.id)}
                                disabled={sendingWa === a.id}
                              >
                                <Send className="h-4 w-4 mr-1.5" />
                                {sendingWa === a.id ? "Sending..." : "Send via WhatsApp"}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              className="bg-primary"
                              onClick={() => actions.markAppointmentComplete(a.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1.5" />
                              Mark Appointment Complete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default DoctorDashboard;
