import { Afacad } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface VehicleImage {
  url: string;
  title: string;
}

interface ImageModalProps {
  selectedImage: VehicleImage | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageModal({
  selectedImage,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) {
  return (
    <Dialog open={!!selectedImage} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-white border-2 border-[#cb6441]/20">
        {selectedImage && (
          <div className="relative">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-[40vh] sm:h-[60vh] object-contain rounded-t-lg"
            />
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-[#cb6441] hover:bg-[#cb6441]/90 text-white shadow-lg"
                onClick={onPrev}
              >
                <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-[#cb6441] hover:bg-[#cb6441]/90 text-white shadow-lg"
                onClick={onNext}
              >
                <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#cb6441] rounded-b-lg">
              <p
                className={`text-white text-lg sm:text-xl font-medium ${afacad.className}`}
              >
                {selectedImage.title}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
