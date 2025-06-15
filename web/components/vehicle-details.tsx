import { Afacad } from "next/font/google";
import { Car, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface VehicleInfo {
  make: string;
  color: string;
}

interface VehicleDetailsProps {
  vehicleInfo: VehicleInfo;
  onReset: () => void;
}

export function VehicleDetails({ vehicleInfo, onReset }: VehicleDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <Button
          onClick={onReset}
          className={`h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-lg bg-[#cb6441] hover:bg-[#cb6441]/90 ${afacad.className} cursor-pointer`}
          size="lg"
        >
          Check Another Vehicle
        </Button>
      </div>
      <div className="rounded p-6 sm:p-8 border-[1px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              <span className={`${afacad.className} font-medium`}>Make</span>
            </div>
            <p className={`text-2xl sm:text-3xl font-bold ${afacad.className}`}>
              {vehicleInfo.make}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <span className={`${afacad.className} font-medium`}>Color</span>
            </div>
            <p className={`text-2xl sm:text-3xl font-bold ${afacad.className}`}>
              {vehicleInfo.color}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
