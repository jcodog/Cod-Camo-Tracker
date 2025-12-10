import { renderBaseTemplate } from "./base-template";

interface PasswordResetEmailProps {
  userName?: string;
  resetUrl: string;
}

export const renderPasswordResetEmail = ({
  userName = "Operator",
  resetUrl,
}: PasswordResetEmailProps) => {
  return renderBaseTemplate({
    preview: "Reset your Cod Camo Tracker password",
    title: "Reset your access credentials",
    body: `Hey ${userName},<br /><br />A password reset was requested for your account. If this was you, tap the button below to choose a new password. This link expires in 15 minutes. If you didn’t request a reset, ignore this email.`,
    action: {
      label: "Reset password",
      href: resetUrl,
    },
  });
};
