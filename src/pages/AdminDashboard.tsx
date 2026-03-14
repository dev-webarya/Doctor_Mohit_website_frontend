import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/store/AppDataContext";
import { sendAppointmentConfirmation, sendVaccinationReminder, getVaccinationReminderWaUrl } from "@/lib/whatsappApi";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, UserCheck, Clock, Bell, Send } from "lucide-react";

const AdminDashboard = () => {
  const { data, actions } = useAppData();
  const [verifying, setVerifying] = useState<string | null>(null);
  const [sendingVac, setSendingVac] = useState<string | null>(null);
  const [notifyingAll, setNotifyingAll] = useState(false);

  const handleVerify = async (a: { id: string; patientId: string; doctorName: string; date: string; time: string; reason?: string }) => {
    const patient = data.patients.find((p) => p.id === a.patientId);
    actions.verifyAppointment(a.id);
    if (patient?.phone) {
      setVerifying(a.id);
      const { ok, error } = await sendAppointmentConfirmation({
        to: patient.phone,
        doctorName: a.doctorName,
        patientName: `${patient.firstName} ${patient.lastName}`.trim(),
        patientAge: "N/A",
        date: a.date,
        time: a.time,
        reason: a.reason || "General",
      });
      if (!ok && error) console.warn("WhatsApp notification failed:", error);
      setVerifying(null);
    }
  };

  const handleSchedule = async () => {
    if (!appointment.patientId || !appointment.doctorName || !appointment.date || !appointment.time) return;
    const patient = data.patients.find((p) => p.id === appointment.patientId);
    actions.scheduleAppointment(appointment, true);
    if (patient?.phone) {
      const { ok, error } = await sendAppointmentConfirmation({
        to: patient.phone,
        doctorName: appointment.doctorName,
        patientName: `${patient.firstName} ${patient.lastName}`.trim(),
        patientAge: "N/A",
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason || "General",
      });
      if (!ok && error) console.warn("WhatsApp notification failed:", error);
    }
    setAppointment({ patientId: "", doctorName: "", date: "", time: "", reason: "" });
  };

  const pending = data.patients.filter((p) => !p.verified);
  const verified = data.patients.filter((p) => p.verified);
  const today = new Date().toISOString().slice(0, 10);
  const in14Days = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const dueVaccinations = verified.flatMap((p) =>
    p.vaccines
      .filter((v) => !v.done && v.dueDate && v.dueDate <= in14Days && p.phone?.trim())
      .map((v) => ({ patient: p, vaccine: v }))
  );

  const handleSendVaccinationReminder = async (patientId: string, vaccineId: string) => {
    const item = dueVaccinations.find((x) => x.patient.id === patientId && x.vaccine.id === vaccineId);
    if (!item?.patient.phone) return;
    const patientName = `${item.patient.firstName} ${item.patient.lastName}`.trim();
    const dueDate = item.vaccine.dueDate || today;
    const key = `${patientId}-${vaccineId}`;
    setSendingVac(key);
    const { ok } = await sendVaccinationReminder({
      to: item.patient.phone,
      patientName,
      vaccineName: item.vaccine.name,
      dueDate,
    });
    if (!ok) {
      window.open(
        getVaccinationReminderWaUrl(item.patient.phone, patientName, item.vaccine.name, dueDate),
        "_blank",
        "noopener,noreferrer"
      );
    }
    setSendingVac(null);
  };

  const handleNotifyAllDue = async () => {
    setNotifyingAll(true);
    for (const { patient, vaccine } of dueVaccinations) {
      if (!patient.phone) continue;
      const patientName = `${patient.firstName} ${patient.lastName}`.trim();
      const dueDate = vaccine.dueDate || today;
      const { ok } = await sendVaccinationReminder({
        to: patient.phone,
        patientName,
        vaccineName: vaccine.name,
        dueDate,
      });
      if (!ok) {
        window.open(getVaccinationReminderWaUrl(patient.phone, patientName, vaccine.name, dueDate), "_blank", "noopener,noreferrer");
      }
    }
    setNotifyingAll(false);
  };

  const [customVaccineName, setCustomVaccineName] = useState("");
  const [appointment, setAppointment] = useState<{ patientId: string; doctorName: string; date: string; time: string; reason: string }>({
    patientId: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });
  const [employee, setEmployee] = useState<{ name: string; role: string; email: string }>({
    name: "",
    role: "",
    email: "",
  });

  const allVaccines = verified.flatMap((p) => p.vaccines.map((v) => v.id));

  const logout = () => {
    localStorage.removeItem("carecure-admin-auth");
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard | Care and Cure</title>
      </Helmet>
      <section className="pt-6 pb-10 bg-muted/50">
        <div className="container mx-auto container-padding space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <Link to="/login/admin">
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Pending Appointments
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Verify patient bookings from website or dashboard. Once verified, the appointment goes to the assigned doctor.
              </p>
              <div className="space-y-3">
                {data.appointments.filter((a) => a.status === "pending").length === 0 && (
                  <p className="text-muted-foreground text-sm">No pending appointments.</p>
                )}
                {data.appointments
                  .filter((a) => a.status === "pending")
                  .map((a) => {
                    const patient = data.patients.find((p) => p.id === a.patientId);
                    return (
                      <div
                        key={a.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-4 bg-amber-50/50 dark:bg-amber-950/20"
                      >
                        <div>
                          <div className="font-medium">
                            {patient ? `${patient.firstName} ${patient.lastName}` : "Unknown"} • {a.date} {a.time}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {a.doctorName} • {a.reason || "General"}
                          </div>
                          {patient && (
                            <div className="text-xs text-muted-foreground mt-1">{patient.phone} • {patient.email}</div>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" onClick={() => handleVerify(a)} disabled={verifying === a.id}>
                            {verifying === a.id ? "Sending..." : "Verify"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => actions.rejectAppointment(a.id)}>
                            Reject
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Pending Registrations
              </h2>
              <div className="space-y-3">
                {pending.length === 0 && <p className="text-muted-foreground text-sm">No pending registrations.</p>}
                {pending.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="font-medium">
                        {p.firstName} {p.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {p.email} • {p.phone}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => actions.verifyPatient(p.id, true)}>Approve</Button>
                      <Button variant="outline" onClick={() => actions.verifyPatient(p.id, false)}>
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Schedule Appointment</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <select
                    className="h-10 w-full rounded-md border border-input bg-background px-3"
                    value={appointment.patientId}
                    onChange={(e) => setAppointment({ ...appointment, patientId: e.target.value })}
                  >
                    <option value="">Select patient</option>
                    {verified.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <select
                    className="h-10 w-full rounded-md border border-input bg-background px-3"
                    value={appointment.doctorName}
                    onChange={(e) => setAppointment({ ...appointment, doctorName: e.target.value })}
                  >
                    <option value="">Select doctor</option>
                    <option value="Dr. Mohit Singhal">Dr. Mohit Singhal</option>
                    <option value="Dr. Himanshu Singhal">Dr. Himanshu Singhal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={appointment.date} onChange={(e) => setAppointment({ ...appointment, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={appointment.time} onChange={(e) => setAppointment({ ...appointment, time: e.target.value })} />
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label>Reason</Label>
                  <Input
                    placeholder="Reason (optional)"
                    value={appointment.reason}
                    onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleSchedule}>
                Schedule
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Vaccination Schedule</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vac-patient">Patient</Label>
                  <select
                    id="vac-patient"
                    className="h-10 w-full rounded-md border border-input bg-background px-3"
                    value={appointment.patientId}
                    onChange={(e) => setAppointment({ ...appointment, patientId: e.target.value })}
                  >
                    <option value="">Select patient</option>
                    {verified.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vac-type">Vaccine</Label>
                  <select
                    id="vac-type"
                    className="h-10 w-full rounded-md border border-input bg-background px-3"
                    value={appointment.reason}
                    onChange={(e) => {
                      setAppointment({ ...appointment, reason: e.target.value });
                      if (e.target.value !== "__other__") setCustomVaccineName("");
                    }}
                  >
                    <option value="">Select vaccine</option>
                    {verified
                      .flatMap((p) => p.vaccines)
                      .reduce<{ id: string; name: string }[]>((acc, v) => {
                        if (!acc.find((x) => x.id === v.id)) {
                          acc.push({ id: v.id, name: v.name });
                        }
                        return acc;
                      }, [])
                      .map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    <option value="__other__">Other</option>
                  </select>
                  {appointment.reason === "__other__" && (
                    <Input
                      placeholder="Enter vaccine name..."
                      value={customVaccineName}
                      onChange={(e) => setCustomVaccineName(e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vac-date">Due Date</Label>
                  <Input
                    id="vac-date"
                    type="date"
                    value={appointment.date}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  if (!appointment.patientId || !appointment.date) return;
                  if (appointment.reason === "__other__") {
                    if (!customVaccineName.trim()) return;
                    actions.addVaccine(appointment.patientId, customVaccineName.trim(), appointment.date);
                    setCustomVaccineName("");
                  } else {
                    if (!appointment.reason) return;
                    actions.scheduleVaccine(appointment.patientId, appointment.reason, appointment.date);
                  }
                  setAppointment({ ...appointment, date: "", reason: "" });
                }}
              >
                Schedule Vaccination
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Vaccination WhatsApp Reminders
              </h2>
              <p className="text-sm text-muted-foreground">
                Notify registered patients about upcoming vaccinations. Only verified patients with a phone number and a scheduled due date (within 14 days) appear below.
              </p>
              {dueVaccinations.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">No due vaccinations. Schedule vaccines above to create reminders.</p>
              ) : (
                <>
                  <div className="space-y-2">
                    {dueVaccinations.map(({ patient, vaccine }) => {
                      const key = `${patient.id}-${vaccine.id}`;
                      return (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border p-3 bg-muted/30"
                        >
                          <div>
                            <span className="font-medium">{patient.firstName} {patient.lastName}</span>
                            <span className="text-muted-foreground"> • {vaccine.name}</span>
                            <span className="text-sm text-muted-foreground ml-1">(Due: {vaccine.dueDate})</span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white shrink-0"
                            onClick={() => handleSendVaccinationReminder(patient.id, vaccine.id)}
                            disabled={sendingVac === key}
                          >
                            <Send className="h-4 w-4 mr-1.5" />
                            {sendingVac === key ? "Sending..." : "Send WhatsApp"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    onClick={handleNotifyAllDue}
                    disabled={notifyingAll || dueVaccinations.length === 0}
                    variant="outline"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    {notifyingAll ? "Sending..." : "Notify All Due (System)"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Employees</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emp-name">Name</Label>
                  <Input
                    id="emp-name"
                    placeholder="Employee name"
                    value={employee.name}
                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-role">Role</Label>
                  <Input
                    id="emp-role"
                    placeholder="Role"
                    value={employee.role}
                    onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-email">Email</Label>
                  <Input
                    id="emp-email"
                    type="email"
                    placeholder="email@example.com"
                    value={employee.email}
                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  if (!employee.name || !employee.role) return;
                  actions.addEmployee({ name: employee.name, role: employee.role, email: employee.email || undefined });
                  setEmployee({ name: "", role: "", email: "" });
                }}
              >
                Add Employee
              </Button>
              <div className="space-y-3 pt-4">
                {data.employees.length === 0 && <p className="text-sm text-muted-foreground">No employees added yet.</p>}
                {data.employees.map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {e.role}
                        {e.email ? ` • ${e.email}` : ""}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => actions.removeEmployee(e.id)}>
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                All Appointments
              </h2>
              <div className="space-y-2">
                {data.appointments.length === 0 && <p className="text-sm text-muted-foreground">No appointments.</p>}
                {data.appointments.map((a) => {
                  const patient = data.patients.find((p) => p.id === a.patientId);
                  const statusColor =
                    a.status === "pending"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                      : a.status === "scheduled"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                        : a.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
                  return (
                    <div key={a.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="font-medium">
                          {a.date} {a.time}
                        </div>
                        <span className={`text-xs uppercase tracking-wide px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
                          {a.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Doctor: {a.doctorName}
                        {patient ? ` • Patient: ${patient.firstName} ${patient.lastName}` : ""}
                      </div>
                      {a.reason && <div className="text-sm text-muted-foreground">Reason: {a.reason}</div>}
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

export default AdminDashboard;
