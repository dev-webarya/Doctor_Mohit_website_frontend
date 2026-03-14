import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useAppData, type PrescriptionItem, MEDICATION_TIMING } from "@/store/AppDataContext";
import { parsePrescription } from "@/utils/prescription";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FileText, Pill, Clock } from "lucide-react";

const PatientDashboard = () => {
  const { id } = useParams();
  const { data, actions } = useAppData();
  const patient = data.patients.find((p) => p.id === id);
  const appts = data.appointments.filter((a) => a.patientId === id);

  const [booking, setBooking] = useState<{ doctorName: string; date: string; time: string; reason: string }>({
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  const [vaccineSchedule, setVaccineSchedule] = useState<{ vaccineId: string; date: string }>({
    vaccineId: "",
    date: "",
  });

  return (
    <Layout>
      <Helmet>
        <title>Patient Dashboard | Care and Cure</title>
      </Helmet>
      <section className="pt-6 pb-10 bg-muted/50">
        <div className="container mx-auto container-padding space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Patient Dashboard</h1>
            <Link to="/login/patient">
              <Button variant="outline" size="sm">Logout</Button>
            </Link>
          </div>
          {!patient && <p className="text-sm text-muted-foreground">Patient not found.</p>}
          {patient && (
            <>
              <Card>
                <CardContent className="p-6 space-y-1">
                  <div className="font-semibold">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">{patient.email} • {patient.phone}</div>
                  <div className="text-sm">
                    Status: <span className={patient.verified ? "text-green-600" : "text-amber-600"}>{patient.verified ? "Verified" : "Pending verification"}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="text-lg font-semibold">Vaccination Checklist & Reminder</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {patient.vaccines.map((v) => (
                      <label key={v.id} className="flex items-center gap-3 rounded-lg border p-3">
                        <Checkbox
                          checked={v.done}
                          onCheckedChange={(checked) => actions.toggleVaccine(patient.id, v.id, Boolean(checked))}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{v.name}</div>
                          {v.dueDate && !v.date && (
                            <div
                              className={
                                new Date(v.dueDate) < new Date()
                                  ? "text-xs text-red-600"
                                  : "text-xs text-amber-600"
                              }
                            >
                              {new Date(v.dueDate) < new Date()
                                ? `Overdue since ${v.dueDate}`
                                : `Due on ${v.dueDate}`}
                            </div>
                          )}
                          {v.date && <div className="text-xs text-muted-foreground">Completed on {v.date}</div>}
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 border-t pt-4 space-y-3">
                    <div className="text-sm font-medium">Schedule a vaccination</div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="vaccine-name">Vaccine</Label>
                        <select
                          id="vaccine-name"
                          className="h-10 w-full rounded-md border border-input bg-background px-3"
                          value={vaccineSchedule.vaccineId}
                          onChange={(e) => setVaccineSchedule({ ...vaccineSchedule, vaccineId: e.target.value })}
                        >
                          <option value="">Select vaccine</option>
                          {patient.vaccines.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="vaccine-date">Due date</Label>
                        <Input
                          id="vaccine-date"
                          type="date"
                          value={vaccineSchedule.date}
                          onChange={(e) => setVaccineSchedule({ ...vaccineSchedule, date: e.target.value })}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          className="w-full"
                          onClick={() => {
                            if (!vaccineSchedule.vaccineId || !vaccineSchedule.date || !patient.id) return;
                            actions.scheduleVaccine(patient.id, vaccineSchedule.vaccineId, vaccineSchedule.date);
                            setVaccineSchedule({ vaccineId: "", date: "" });
                          }}
                        >
                          Add Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="text-lg font-semibold">Book New Appointment</div>
                  <p className="text-sm text-muted-foreground">
                    Choose your doctor and preferred date and time. Your request goes to admin for verification. Once verified, it appears here and is assigned to the doctor.
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="book-doctor">Doctor</Label>
                      <select
                        id="book-doctor"
                        className="h-10 w-full rounded-md border border-input bg-background px-3"
                        value={booking.doctorName}
                        onChange={(e) => setBooking({ ...booking, doctorName: e.target.value })}
                      >
                        <option value="">Select doctor</option>
                        <option value="Dr. Mohit Singhal">Dr. Mohit Singhal</option>
                        <option value="Dr. Himanshu Singhal">Dr. Himanshu Singhal</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="book-date">Date</Label>
                      <Input
                        id="book-date"
                        type="date"
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="book-time">Time</Label>
                      <Input
                        id="book-time"
                        type="time"
                        value={booking.time}
                        onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-1 sm:col-span-2">
                      <Label htmlFor="book-reason">Reason</Label>
                      <Input
                        id="book-reason"
                        placeholder="Reason (optional)"
                        value={booking.reason}
                        onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      if (!booking.doctorName || !booking.date || !booking.time || !id) return;
                      actions.scheduleAppointment({
                        patientId: id,
                        doctorName: booking.doctorName,
                        date: booking.date,
                        time: booking.time,
                        reason: booking.reason,
                      });
                      setBooking({ doctorName: "", date: "", time: "", reason: "" });
                    }}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="text-lg font-semibold">Appointments</div>
                  <div className="space-y-2">
                    {appts.length === 0 && <p className="text-sm text-muted-foreground">No appointments yet.</p>}
                    {appts.map((a) => {
                      const meds = a.prescription ? parsePrescription(a.prescription) : null;
                      const isStructured = Array.isArray(meds) && meds.length > 0;
                      return (
                        <div key={a.id} className="rounded-lg border p-4 space-y-3">
                          <div>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="font-medium">{a.date} {a.time}</div>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  a.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : a.status === "scheduled"
                                      ? "bg-blue-100 text-blue-800"
                                      : a.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {a.status}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Doctor: {a.doctorName} • {a.reason || "General"}
                            </div>
                            {a.appointmentSummary?.trim() && (
                              <p className="text-sm mt-2 p-2 rounded bg-muted/50">{a.appointmentSummary.trim()}</p>
                            )}
                          </div>
                          {a.prescription && (
                            <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                Prescription
                              </div>
                              {a.diagnosisSummary?.trim() && (
                                <p className="text-sm"><strong>Diagnosis:</strong> {a.diagnosisSummary.trim()}</p>
                              )}
                              {isStructured ? (
                                <div className="space-y-2">
                                  {(meds as PrescriptionItem[]).map((m, i) => (
                                    <div key={i} className="rounded-md bg-background p-3 border space-y-1">
                                      <div className="flex items-center gap-2 font-medium">
                                        <Pill className="h-4 w-4 text-primary" />
                                        {m.medicineName}
                                      </div>
                                      <div className="text-sm text-muted-foreground grid sm:grid-cols-2 gap-x-4 gap-y-0.5">
                                        {m.dose && <span><strong>Dose:</strong> {m.dose}</span>}
                                        {m.frequency && <span><strong>Frequency:</strong> {m.frequency}{m.timesPerDay ? ` (${m.timesPerDay}x/day)` : ""}</span>}
                                        {m.timing && (
                                          <span>
                                            <strong>When:</strong> {MEDICATION_TIMING.find((t) => t.value === m.timing)?.label ?? m.timing}
                                          </span>
                                        )}
                                        {m.durationDays && (
                                          <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3" />
                                            <strong>Duration:</strong> {m.durationDays} days
                                          </span>
                                        )}
                                      </div>
                                      {m.description?.trim() && (
                                        <p className="text-sm text-muted-foreground">{m.description.trim()}</p>
                                      )}
                                      {m.notes?.trim() && (
                                        <p className="text-sm text-muted-foreground pt-1 border-t mt-1">
                                          {m.notes.trim()}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">{a.prescription}</p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PatientDashboard;
