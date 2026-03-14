import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type VaccineRecord = {
  id: string;
  name: string;
  done: boolean;
  date?: string;
  dueDate?: string;
};

export const MEDICATION_TIMING = [
  { value: "before_breakfast", label: "Before breakfast" },
  { value: "after_food", label: "After food" },
  { value: "lunch_time", label: "Lunch time" },
  { value: "before_dinner", label: "Before dinner" },
  { value: "after_dinner_evening", label: "After dinner (evening)" },
] as const;

export type PrescriptionItem = {
  medicineName: string;
  dose?: string;
  frequency?: string;
  timesPerDay?: number;
  durationDays?: string;
  timing?: string;
  description?: string;
  notes?: string;
};

type Appointment = {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  time: string;
  reason?: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  prescription?: string;
  appointmentSummary?: string;
  diagnosisSummary?: string;
  patientPrefix?: string;
  prescriptionSent?: boolean;
};

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  motherName?: string;
  fatherName?: string;
  verified: boolean;
  vaccines: VaccineRecord[];
};

type Employee = {
  id: string;
  name: string;
  role: string;
  email?: string;
};

type AppData = {
  patients: Patient[];
  appointments: Appointment[];
  employees: Employee[];
};

type AppActions = {
  registerPatient: (data: Omit<Patient, "id" | "verified" | "vaccines">) => Patient;
  verifyPatient: (patientId: string, verified: boolean) => void;
  scheduleAppointment: (appt: Omit<Appointment, "id" | "status">, verified?: boolean) => Appointment;
  verifyAppointment: (appointmentId: string) => void;
  rejectAppointment: (appointmentId: string) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment["status"]) => void;
  updateAppointmentSummary: (appointmentId: string, summary: string) => void;
  updateAppointmentPrescription: (appointmentId: string, prescription: string) => void;
  updateAppointmentPrescriptionMeta: (appointmentId: string, meta: { diagnosisSummary?: string; patientPrefix?: string }) => void;
  markPrescriptionSent: (appointmentId: string) => void;
  markAppointmentComplete: (appointmentId: string) => void;
  toggleVaccine: (patientId: string, vaccineId: string, done: boolean) => void;
  scheduleVaccine: (patientId: string, vaccineId: string, dueDate: string) => void;
  addVaccine: (patientId: string, vaccineName: string, dueDate?: string) => void;
  getPatientByEmail: (email: string) => Patient | undefined;
  validatePatientLogin: (email: string, password: string) => Patient | undefined;
  addEmployee: (data: Omit<Employee, "id">) => Employee;
  removeEmployee: (employeeId: string) => void;
};

// Standard pediatric vaccination schedule (Birth – 18 months)
const defaultVaccines: VaccineRecord[] = [
  { id: "hepB", name: "Hepatitis B", done: false },
  { id: "dtap", name: "DTaP", done: false },
  { id: "hib", name: "Hib", done: false },
  { id: "ipv", name: "IPV", done: false },
  { id: "pcv13", name: "PCV13", done: false },
  { id: "rv", name: "RV", done: false },
  { id: "influenza", name: "Influenza", done: false },
  { id: "hepA", name: "Hepatitis A", done: false },
  { id: "mmr", name: "MMR", done: false },
  { id: "varicella", name: "Varicella", done: false },
];

// Demo patients for demo mode
const DEMO_PATIENTS: Patient[] = [
  {
    id: "demo-1",
    firstName: "test_patient1",
    lastName: "Demo",
    email: "test_patient1@example.com",
    password: "password123",
    phone: "9876543210",
    verified: true,
    vaccines: [
      { id: "hepB", name: "Hepatitis B", done: true, date: "2023-02-20" },
      { id: "dtap", name: "DTaP", done: true, date: "2023-01-15" },
      { id: "hib", name: "Hib", done: false, dueDate: "2024-04-01" },
      { id: "ipv", name: "IPV", done: false },
      { id: "pcv13", name: "PCV13", done: false },
      { id: "mmr", name: "MMR", done: false },
    ],
  },
  {
    id: "demo-2",
    firstName: "test_patient2",
    lastName: "Demo",
    email: "test_patient2@example.com",
    password: "password123",
    phone: "9876543211",
    verified: true,
    vaccines: defaultVaccines.map((v) => ({ ...v })),
  },
];

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "demo-apt-1",
    patientId: "demo-1",
    doctorName: "Dr. Mohit Singhal",
    date: "2024-02-25",
    time: "10:00",
    reason: "Routine checkup",
    status: "scheduled",
  },
  {
    id: "demo-apt-2",
    patientId: "demo-2",
    doctorName: "Dr. Himanshu Singhal",
    date: "2024-02-26",
    time: "14:30",
    reason: "Vaccination",
    status: "pending",
  },
];

const DEMO_EMPLOYEES: Employee[] = [
  { id: "emp-1", name: "Dr. Mohit Singhal", role: "Doctor", email: "mohit@carecure.com" },
  { id: "emp-2", name: "Dr. Himanshu Singhal", role: "Doctor", email: "himanshu@carecure.com" },
  { id: "emp-3", name: "Nurse Maria", role: "Nurse", email: "maria@carecure.com" },
];

const AppDataContext = createContext<{ data: AppData; actions: AppActions } | null>(null);

const STORAGE_KEY = "carecure-app-data";

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Return demo data on first load
      return { 
        patients: DEMO_PATIENTS, 
        appointments: DEMO_APPOINTMENTS, 
        employees: DEMO_EMPLOYEES 
      };
    }
    try {
      const parsed = JSON.parse(raw) as Partial<AppData>;
      // Check if patients have password field - if not, reset to demo data
      const hasPasswordField = parsed.patients && parsed.patients.length > 0 && 
        parsed.patients[0].hasOwnProperty('password');
      
      if (!hasPasswordField) {
        // Old data without passwords, reset to demo
        return { 
          patients: DEMO_PATIENTS, 
          appointments: DEMO_APPOINTMENTS, 
          employees: DEMO_EMPLOYEES 
        };
      }
      
      return {
        patients: parsed.patients ?? [],
        appointments: parsed.appointments ?? [],
        employees: parsed.employees ?? [],
      };
    } catch {
      return { 
        patients: DEMO_PATIENTS, 
        appointments: DEMO_APPOINTMENTS, 
        employees: DEMO_EMPLOYEES 
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const actions: AppActions = useMemo(
    () => ({
      registerPatient: (payload) => {
        const p: Patient = {
          id: crypto.randomUUID(),
          verified: false,
          vaccines: defaultVaccines.map((v) => ({ ...v })),
          ...payload,
        };
        setData((d) => ({ ...d, patients: [...d.patients, p] }));
        return p;
      },
      verifyPatient: (patientId, verified) => {
        setData((d) => ({
          ...d,
          patients: d.patients.map((p) => (p.id === patientId ? { ...p, verified } : p)),
        }));
      },
      scheduleAppointment: (appt, verified) => {
        const a: Appointment = { id: crypto.randomUUID(), status: verified ? "scheduled" : "pending", ...appt };
        setData((d) => ({ ...d, appointments: [...d.appointments, a] }));
        return a;
      },
      verifyAppointment: (appointmentId) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) =>
            a.id === appointmentId ? { ...a, status: "scheduled" as const } : a
          ),
        }));
      },
      rejectAppointment: (appointmentId) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) =>
            a.id === appointmentId ? { ...a, status: "cancelled" as const } : a
          ),
        }));
      },
      updateAppointmentStatus: (appointmentId, status) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) => (a.id === appointmentId ? { ...a, status } : a)),
        }));
      },
      updateAppointmentPrescription: (appointmentId, prescription) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) => (a.id === appointmentId ? { ...a, prescription } : a)),
        }));
      },
      updateAppointmentSummary: (appointmentId, summary) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) =>
            a.id === appointmentId ? { ...a, appointmentSummary: summary } : a
          ),
        }));
      },
      updateAppointmentPrescriptionMeta: (appointmentId, meta) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) =>
            a.id === appointmentId ? { ...a, ...meta } : a
          ),
        }));
      },
      markPrescriptionSent: (appointmentId) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) =>
            a.id === appointmentId ? { ...a, prescriptionSent: true } : a
          ),
        }));
      },
      markAppointmentComplete: (appointmentId) => {
        setData((d) => ({
          ...d,
          appointments: d.appointments.map((a) =>
            a.id === appointmentId
              ? { ...a, status: "completed" as const, prescriptionSent: true }
              : a
          ),
        }));
      },
      toggleVaccine: (patientId, vaccineId, done) => {
        setData((d) => ({
          ...d,
          patients: d.patients.map((p) =>
            p.id === patientId
              ? {
                  ...p,
                  vaccines: p.vaccines.map((v) =>
                    v.id === vaccineId
                      ? {
                          ...v,
                          done,
                          date: done ? new Date().toISOString().slice(0, 10) : undefined,
                        }
                      : v,
                  ),
                }
              : p,
          ),
        }));
      },
      scheduleVaccine: (patientId, vaccineId, dueDate) => {
        setData((d) => ({
          ...d,
          patients: d.patients.map((p) =>
            p.id === patientId
              ? {
                  ...p,
                  vaccines: p.vaccines.map((v) =>
                    v.id === vaccineId
                      ? {
                          ...v,
                          dueDate,
                        }
                      : v,
                  ),
                }
              : p,
          ),
        }));
      },
      addVaccine: (patientId, vaccineName, dueDate) => {
        const id = "custom-" + crypto.randomUUID().slice(0, 8);
        const newVaccine: VaccineRecord = {
          id,
          name: vaccineName.trim(),
          done: false,
          dueDate,
        };
        setData((d) => ({
          ...d,
          patients: d.patients.map((p) =>
            p.id === patientId
              ? { ...p, vaccines: [...p.vaccines, newVaccine] }
              : p
          ),
        }));
      },
      getPatientByEmail: (email) => {
        return data.patients.find((p) => p.email.toLowerCase() === email.toLowerCase());
      },
      validatePatientLogin: (email, password) => {
        return data.patients.find(
          (p) => p.email.toLowerCase() === email.toLowerCase() && p.password === password
        );
      },
      addEmployee: (payload) => {
        const e: Employee = {
          id: crypto.randomUUID(),
          ...payload,
        };
        setData((d) => ({ ...d, employees: [...d.employees, e] }));
        return e;
      },
      removeEmployee: (employeeId) => {
        setData((d) => ({
          ...d,
          employees: d.employees.filter((e) => e.id !== employeeId),
        }));
      },
    }),
    [data],
  );

  return <AppDataContext.Provider value={{ data, actions }}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("AppDataProvider missing");
  return ctx;
}

export type { Patient, Appointment, VaccineRecord, AppData, AppActions, Employee };
