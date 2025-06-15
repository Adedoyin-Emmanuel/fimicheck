"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import axios from "axios";
import { Loader2, Car, Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Afacad, Playfair_Display } from "next/font/google";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playwrightDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface VehicleImage {
  url: string;
  title: string;
}

interface VehicleInfo {
  make: string;
  color: string;
}

interface ApiResponse {
  code: number;
  status: string;
  success: boolean;
  message: string;
  data: {
    vehicleInfo: VehicleInfo;
    images: VehicleImage[];
  };
}

export default function Home() {
  const [plateNumber, setPlateNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<VehicleImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLookup = async () => {
    if (!plateNumber) return;

    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:2800/v1/lookup",
        {
          plateNumber,
        }
      );
      setResult(response.data);
    } catch (err) {
      toast.error("Failed to lookup plate number. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: VehicleImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    if (!result?.data.images) return;
    const nextIndex = (currentImageIndex + 1) % result.data.images.length;
    setSelectedImage(result.data.images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    if (!result?.data.images) return;
    const prevIndex =
      (currentImageIndex - 1 + result.data.images.length) %
      result.data.images.length;
    setSelectedImage(result.data.images[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 sm:mb-16">
          <h1
            className={`text-4xl sm:text-6xl font-black tracking-tight ${playwrightDisplay.className}`}
          >
            Fimi<span className="text-[#cb6441]">Check</span>
          </h1>
          <p
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto ${afacad.className}`}
          >
            Instantly lookup vehicle information using Nigerian plate numbers
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2
              className={`text-xl sm:text-2xl font-semibold ${playwrightDisplay.className}`}
            >
              Enter Plate Number
            </h2>
            <p className={`text-muted-foreground ${afacad.className}`}>
              Type in the 8-character plate number
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={8}
                value={plateNumber}
                onChange={(value) => setPlateNumber(value.toUpperCase())}
                className="gap-3"
                containerClassName="gap-4"
              >
                <InputOTPGroup className="gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-12 sm:w-14 h-12 sm:h-14 text-xl sm:text-2xl font-bold bg-white/50 backdrop-blur-sm rounded-lg focus:ring-0 focus:outline-none shadow-none transition-all"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              onClick={handleLookup}
              disabled={loading || !plateNumber}
              className="h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-lg bg-[#cb6441] hover:bg-[#cb6441]/90"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Looking up...
                </>
              ) : (
                "Lookup Vehicle"
              )}
            </Button>
          </div>
        </div>

        {result?.data && (
          <div className="mt-8 sm:mt-16 space-y-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="w-5 h-5" />
                    <span className={afacad.className}>Make</span>
                  </div>
                  <p
                    className={`text-2xl sm:text-3xl font-bold ${playwrightDisplay.className}`}
                  >
                    {result.data.vehicleInfo.make}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Palette className="w-5 h-5" />
                    <span className={afacad.className}>Color</span>
                  </div>
                  <p
                    className={`text-2xl sm:text-3xl font-bold ${playwrightDisplay.className}`}
                  >
                    {result.data.vehicleInfo.color}
                  </p>
                </div>
              </div>
            </div>

            {result.data.images && result.data.images.length > 0 && (
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 sm:p-8">
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-6 ${playwrightDisplay.className}`}
                >
                  Vehicle Images
                </h3>
                <ScrollArea className="h-[400px] sm:h-[600px] w-full rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
                    {result.data.images.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(image, index)}
                      >
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p
                              className={`text-sm text-white/90 line-clamp-2 ${afacad.className}`}
                            >
                              {image.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-[60vh] sm:h-[80vh] object-contain rounded-lg"
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p
                    className={`text-white text-base sm:text-lg font-medium ${afacad.className}`}
                  >
                    {selectedImage.title}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
