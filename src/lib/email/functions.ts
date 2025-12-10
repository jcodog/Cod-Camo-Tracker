import { mailClient } from "./mail-client";
import { renderPasswordResetEmail } from "./templates/password-reset-email";
import { renderVerificationEmail } from "./templates/verification-email";
import { renderVerificationOtpEmail } from "./templates/verification-otp-email";

const senderEmail = process.env.MAILCHANNELS_FROM_EMAIL ?? "";
const senderName = process.env.MAILCHANNELS_FROM_NAME ?? "Cod Camo Tracker";

interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: SendEmailArgs) => {
  await mailClient.sendEmail({
    personalizations: [
      {
        to: [{ email: to }],
      },
    ],
    from: {
      email: senderEmail,
      name: senderName,
    },
    subject,
    content: [
      {
        type: "text/html",
        value: html,
      },
    ],
  });
};

export const sendVerificationEmail = async ({
  email,
  url,
  name,
}: {
  email: string;
  url: string;
  name?: string | null;
}) => {
  await sendEmail({
    to: email,
    subject: "Verify your Cod Camo Tracker email",
    html: renderVerificationEmail({
      userName: name ?? undefined,
      verifyUrl: url,
    }),
  });
};

export const sendPasswordResetEmail = async ({
  email,
  url,
  name,
}: {
  email: string;
  url: string;
  name?: string | null;
}) => {
  await sendEmail({
    to: email,
    subject: "Reset your Cod Camo Tracker password",
    html: renderPasswordResetEmail({
      userName: name ?? undefined,
      resetUrl: url,
    }),
  });
};

export const sendVerificationOtpEmail = async ({
  email,
  otp,
  name,
  type,
}: {
  email: string;
  otp: string;
  name?: string | null;
  type: "email-verification" | "sign-in" | "forget-password";
}) => {
  try {
    await sendEmail({
      to: email,
      subject: "Your verification code",
      html: renderVerificationOtpEmail({
        userName: name ?? undefined,
        otp,
        purpose: type,
      }),
    });
  } catch (err) {
    throw new Error(String(err));
  }
};
