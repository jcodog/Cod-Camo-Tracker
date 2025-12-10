import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const redirect = (await searchParams)?.redirect;
  const redirectParam =
    typeof redirect === "string" && redirect.length > 0
      ? `?redirect=${encodeURIComponent(redirect)}`
      : "";
  return (
    <AuthShell
      heading="Create operator access"
      subheading="Use your Activision display name so the squad knows who's unlocking what."
      footer={
        <span>
          Already have access? {""}
          <Link
            href={`/sign-in${redirectParam}`}
            className="font-semibold text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
