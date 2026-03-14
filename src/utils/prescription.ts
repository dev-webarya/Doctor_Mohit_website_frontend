import type { PrescriptionItem } from "@/store/AppDataContext";
import jsPDF from "jspdf";

export function parsePrescription(
  prescription: string | undefined
): PrescriptionItem[] | null {
  if (!prescription?.trim()) return null;
  try {
    if (prescription.trim().startsWith("[")) {
      const parsed = JSON.parse(prescription) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as PrescriptionItem[];
    }
  } catch {
    /* legacy plain text */
  }
  return null;
}

export function serializePrescription(items: PrescriptionItem[]): string {
  return JSON.stringify(items);
}

const TIMING_LABELS: Record<string, string> = {
  before_breakfast: "Before breakfast",
  after_food: "After food",
  lunch_time: "Lunch time",
  before_dinner: "Before dinner",
  after_dinner_evening: "After dinner (evening)",
};

export function formatPrescriptionForWhatsApp(
  items: PrescriptionItem[],
  doctorName: string,
  date: string,
  patientName: string,
  patientPrefix?: string,
  diagnosisSummary?: string
): string {
  const prefix = patientPrefix?.trim() ? `${patientPrefix.trim()} ` : "";
  const fullName = prefix + patientName;
  const lines: string[] = [
    `🏥 *Prescription*`,
    `Patient: ${fullName}`,
    `Doctor: ${doctorName}`,
    `Date: ${date}`,
    diagnosisSummary?.trim() ? `Diagnosis: ${diagnosisSummary.trim()}` : "",
    ``,
    `*Medications:*`,
  ].filter(Boolean);
  items.forEach((m, i) => {
    lines.push(`${i + 1}. *${m.medicineName}*`);
    if (m.dose) lines.push(`   Dose: ${m.dose}`);
    if (m.frequency) lines.push(`   Frequency: ${m.frequency}${m.timesPerDay ? ` (${m.timesPerDay}x/day)` : ""}`);
    if (m.timing) lines.push(`   When: ${TIMING_LABELS[m.timing] || m.timing}`);
    if (m.durationDays) lines.push(`   Duration: ${m.durationDays} days`);
    if (m.description?.trim()) lines.push(`   Description: ${m.description.trim()}`);
    if (m.notes?.trim()) lines.push(`   Notes: ${m.notes.trim()}`);
    lines.push(``);
  });
  return lines.join("\n");
}

export function createPrescriptionPdf(
  items: PrescriptionItem[],
  doctorName: string,
  date: string,
  patientName: string,
  patientPrefix?: string,
  diagnosisSummary?: string
): void {
  const doc = new jsPDF();
  const prefix = patientPrefix?.trim() ? `${patientPrefix.trim()} ` : "";
  const fullName = prefix + patientName;

  let y = 20;

  doc.setFontSize(16);
  doc.text("Care & Cure Fertility Centre", 105, y, { align: "center" });
  y += 8;
  doc.setFontSize(11);
  doc.text("Prescription", 105, y, { align: "center" });

  y += 12;
  doc.setFontSize(10);
  doc.text(`Patient: ${fullName}`, 14, y);
  y += 6;
  doc.text(`Doctor: ${doctorName}`, 14, y);
  y += 6;
  doc.text(`Date: ${date}`, 14, y);
  if (diagnosisSummary?.trim()) {
    y += 6;
    const diagLines = doc.splitTextToSize(`Diagnosis: ${diagnosisSummary.trim()}`, 170);
    doc.text(diagLines, 14, y);
    y += 5 + (diagLines.length - 1) * 5;
  }

  y += 10;
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);
  y += 8;

  doc.setFontSize(11);
  items.forEach((m, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${index + 1}. ${m.medicineName}`, 14, y);
    y += 6;
    doc.setFontSize(10);
    if (m.dose) { doc.text(`Dose: ${m.dose}`, 18, y); y += 5; }
    if (m.frequency) {
      doc.text(`Frequency: ${m.frequency}${m.timesPerDay ? ` (${m.timesPerDay}x/day)` : ""}`, 18, y);
      y += 5;
    }
    if (m.timing) {
      doc.text(`When: ${TIMING_LABELS[m.timing] || m.timing}`, 18, y);
      y += 5;
    }
    if (m.durationDays) { doc.text(`Duration: ${m.durationDays} days`, 18, y); y += 5; }
    if (m.description?.trim()) {
      const descLines = doc.splitTextToSize(`Description: ${m.description.trim()}`, 170);
      doc.text(descLines, 18, y);
      y += 5 + (descLines.length - 1) * 5;
    }
    if (m.notes?.trim()) {
      const split = doc.splitTextToSize(`Notes: ${m.notes.trim()}`, 170);
      doc.text(split, 18, y);
      y += 5 + (split.length - 1) * 5;
    }
    y += 4;
    doc.setFontSize(11);
  });

  const safePatient = fullName.replace(/[^a-z0-9]+/gi, "_");
  const safeDate = date.replace(/[^0-9]+/g, "");
  const filename = `prescription_${safePatient}_${safeDate}.pdf`;

  doc.save(filename);
}
