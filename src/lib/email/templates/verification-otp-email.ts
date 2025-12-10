interface Props {
  userName?: string;
  otp: string;
  purpose: "email-verification" | "sign-in" | "forget-password";
}

export function renderVerificationOtpEmail({ userName, otp, purpose }: Props) {
  const title =
    purpose === "sign-in"
      ? "Your sign-in code"
      : purpose === "forget-password"
      ? "Reset code"
      : "Verify your email";

  const greeting = userName ? `Hi ${userName},` : "Hi,";

  return `
    <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #0b1224; color: #e7ecf5; border: 1px solid #16213a; border-radius: 16px;">
      <h2 style="margin: 0 0 12px 0; font-size: 22px; color: #f8fafc;">${title}</h2>
      <p style="margin: 0 0 12px 0; color: #cbd5e1;">${greeting}</p>
      <p style="margin: 0 0 12px 0; color: #cbd5e1;">Use this one-time code to continue:</p>
      <div style="margin: 20px 0; text-align: center;">
        <div style="display: inline-block; padding: 14px 20px; border-radius: 12px; background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%); color: #f8fafc; font-size: 28px; letter-spacing: 8px; font-weight: 700;">
          ${otp}
        </div>
      </div>
      <p style="margin: 0 0 12px 0; color: #cbd5e1;">This code expires in 5 minutes. If you didn’t request it, you can ignore this email.</p>
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">Cod Camo Tracker</p>
    </div>
  `;
}
