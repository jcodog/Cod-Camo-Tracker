import { renderBaseTemplate } from "./base-template";

interface VerificationEmailProps {
  userName?: string;
  verifyUrl: string;
}

export const renderVerificationEmail = ({
  userName = "Operator",
  verifyUrl,
}: VerificationEmailProps) => {
  return renderBaseTemplate({
    preview: "Confirm your email to start tracking camos",
    title: "Verify your Cod Camo Tracker account",
    body: `Hey ${userName},<br /><br />Welcome to Cod Camo Tracker. Tap the button below within the next 30 minutes to confirm your email address and finish setting up your ops console.`,
    action: {
      label: "Verify email",
      href: verifyUrl,
    },
  });
};
