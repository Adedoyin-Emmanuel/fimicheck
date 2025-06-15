import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Afacad } from "next/font/google";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface VehicleLookupFormProps {
  onLookup: (plateNumber: string) => Promise<void>;
  loading: boolean;
}

export function VehicleLookupForm({
  onLookup,
  loading,
}: VehicleLookupFormProps) {
  const [plateNumber, setPlateNumber] = useState("");

  const handleLookup = async () => {
    if (!plateNumber) return;
    await onLookup(plateNumber);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={8}
            value={plateNumber}
            onChange={(value) => setPlateNumber(value.toUpperCase())}
            className="gap-1 sm:gap-3"
            containerClassName="gap-2 sm:gap-4"
            inputMode="text"
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup className="gap-2 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  inputMode="text"
                  className="w-10 h-10 sm:w-14 sm:h-14 text-base sm:text-lg font-bold border-[1px] outline-none focus:outline-none focus:ring-2 focus:ring-[#cb6441] focus:shadow-none transition-all"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          onClick={handleLookup}
          disabled={loading || !plateNumber}
          className={`h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-lg bg-[#cb6441] hover:bg-[#cb6441]/90 ${afacad.className} cursor-pointer`}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Hold up, we&apos;re cooking smtn...
            </>
          ) : (
            "Lookup Vehicle"
          )}
        </Button>
      </div>
    </div>
  );
}
