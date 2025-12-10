"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Display name is too short")
    .max(40, "Keep it under 40 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "Enter the 6-digit code")
    .max(6, "Enter the 6-digit code"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<"form" | "verify">("form");
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleSubmit = async (values: SignUpValues) => {
    setPending(true);
    try {
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message ?? "Unable to create access");
        return;
      }

      setSentEmail(values.email);
      setStep("verify");
      toast.success("We sent a 6-digit code to your email.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unexpected sign-up error"
      );
    } finally {
      setPending(false);
    }
  };

  const handleVerifyOtp = async (values: z.infer<typeof otpSchema>) => {
    if (!sentEmail) return;
    setVerifying(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: sentEmail,
        otp: values.otp,
      });

      if (error) {
        toast.error(error.message ?? "Invalid code, try again.");
        return;
      }

      toast.success("Email verified. Redirecting…");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const resendOtp = async () => {
    if (!sentEmail) return;
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: sentEmail,
        type: "email-verification",
      });
      if (error) {
        toast.error(error.message ?? "Could not resend code");
        return;
      }
      toast.success("Code resent.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend code");
    }
  };

  return step === "form" ? (
    <Form key="sign-up-form" {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activision display name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ghost-141" />
              </FormControl>
              <FormDescription>
                Shown on squad invites, live chat, and ticket replies.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          disabled={pending}
          className="h-11 w-full text-base font-semibold tracking-wide"
        >
          {pending ? "Creating access…" : "Secure my access"}
        </Button>
      </form>
    </Form>
  ) : (
    <Form key="otp-form" {...otpForm}>
      <form
        className="space-y-5"
        onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
      >
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Verify your email</p>
          <p>
            Enter the 6-digit code we sent to{" "}
            <span className="font-semibold text-foreground">{sentEmail}</span>
          </p>
        </div>

        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">One-time code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  className="w-full"
                  containerClassName="w-full justify-center"
                  autoFocus
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <Button
            type="button"
            variant="ghost"
            onClick={resendOtp}
            disabled={verifying}
          >
            Resend code
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={verifying}
            className="h-11 px-5 text-base font-semibold tracking-wide"
          >
            {verifying ? "Verifying…" : "Verify email"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
