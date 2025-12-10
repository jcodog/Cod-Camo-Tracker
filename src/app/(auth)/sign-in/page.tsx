import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const redirect = searchParams?.redirect;
  const redirectParam =
    typeof redirect === "string" && redirect.length > 0
      ? `?redirect=${encodeURIComponent(redirect)}`
      : "";
  return (
    <AuthShell
      heading="Welcome back"
      subheading="Access your ops console, track progress, and coordinate support."
      footer={
        <span>
          Need an account? {""}
          <Link
            href={`/sign-up${redirectParam}`}
            className="font-semibold text-primary hover:text-primary/80"
          >
            Create one
          </Link>
        </span>
      }
    >
      <SignInForm />
    </AuthShell>
  );
}
