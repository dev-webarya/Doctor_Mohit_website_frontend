/**
 * WhatsApp API integration (CPass / SobO API)
 * Uses template messages for appointment confirmation and prescription.
 *
 * SECURITY: For production, call this from a backend server to keep API key safe.
 * Browser calls may be blocked by CORS.
 */

// Use proxy in dev to avoid CORS; direct URL in production (requires backend proxy or CORS from CPass)
const API_BASE =
  import.meta.env.VITE_WHATSAPP_USE_PROXY !== "false" && import.meta.env.DEV
    ? "/api/whatsapp"
    : (import.meta.env.VITE_WHATSAPP_API_URL ?? "https://soboapi.cpass.co.in/v3/336425076224393");
const API_KEY = import.meta.env.VITE_WHATSAPP_API_KEY ?? "";

function formatDateForWhatsApp(dateStr: string, timeStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[(m ?? 1) - 1] ?? "Jan";
    let hour = 12;
    let minute = "00";
    let period = "AM";
    if (timeStr) {
      const [h, min] = timeStr.split(":").map(Number);
      hour = h ?? 12;
      minute = min != null ? String(min).padStart(2, "0") : "00";
      period = (hour ?? 0) >= 12 ? "PM" : "AM";
      hour = (hour ?? 0) % 12 || 12;
    }
    return `${d} ${month} ${hour}${period}`;
  } catch {
    return dateStr + " " + timeStr;
  }
}

function toWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("91") ? digits : `91${digits}`;
}

/** Fallback: open wa.me with pre-filled vaccination reminder when API template doesn't exist */
export function getVaccinationReminderWaUrl(phone: string, patientName: string, vaccineName: string, dueDate: string): string {
  const msg = `Hi ${patientName}, this is a reminder from Care & Cure Centre. The *${vaccineName}* vaccination is due on *${dueDate}*. Please visit us to schedule.`;
  return `https://wa.me/${toWhatsAppPhone(phone)}?text=${encodeURIComponent(msg)}`;
}

export async function sendAppointmentConfirmation(params: {
  to: string;
  doctorName: string;
  patientName: string;
  patientAge?: string;
  date: string;
  time: string;
  reason?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    console.warn("VITE_WHATSAPP_API_KEY not set. Skipping WhatsApp notification.");
    return { ok: false, error: "API key not configured" };
  }

  const dateTimeStr = formatDateForWhatsApp(params.date, params.time);
  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toWhatsAppPhone(params.to),
    type: "template",
    template: {
      name: "appointment_schedule_3",
      language: { code: "en_GB" },
      components: [
        { type: "header", parameters: [] },
        {
          type: "body",
          parameters: [
            { type: "text", text: params.doctorName },
            { type: "text", text: params.patientName },
            { type: "text", text: params.patientAge ?? "N/A" },
            { type: "text", text: dateTimeStr },
            { type: "text", text: params.reason || "General" },
            { type: "text", text: params.doctorName },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

export async function sendPrescriptionNotification(params: {
  to: string;
  patientName: string;
  doctorName: string;
  dateTime: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    console.warn("VITE_WHATSAPP_API_KEY not set. Skipping WhatsApp notification.");
    return { ok: false, error: "API key not configured" };
  }

  const templateName = import.meta.env.VITE_WHATSAPP_PRESCRIPTION_TEMPLATE ?? "prescription_ready";
  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toWhatsAppPhone(params.to),
    type: "template",
    template: {
      name: templateName,
      language: { code: "en_GB" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: params.patientName },
            { type: "text", text: params.doctorName },
            { type: "text", text: params.dateTime },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

export async function sendVaccinationReminder(params: {
  to: string;
  patientName: string;
  vaccineName: string;
  dueDate: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    console.warn("VITE_WHATSAPP_API_KEY not set. Skipping vaccination reminder.");
    return { ok: false, error: "API key not configured" };
  }

  const templateName =
    import.meta.env.VITE_WHATSAPP_VACCINATION_TEMPLATE ?? "vaccination_reminder";
  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toWhatsAppPhone(params.to),
    type: "template",
    template: {
      name: templateName,
      language: { code: "en_GB" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: params.patientName },
            { type: "text", text: params.vaccineName },
            { type: "text", text: params.dueDate },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}
