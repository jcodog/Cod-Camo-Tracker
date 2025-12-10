"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OtpTest() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        className="w-full"
        containerClassName="w-full justify-center"
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

      <p className="text-xs text-muted-foreground">Value: {value}</p>
    </div>
  );
}
