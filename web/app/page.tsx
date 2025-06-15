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
      toast.error("Failed to lookup plate number. Please try again.", {
        style: {
          background: "white",
          color: "#1a1a1a",
          border: "1px solid rgba(203, 100, 65, 0.15)",
          boxShadow: "0 4px 12px rgba(203, 100, 65, 0.05)",
        },
      });
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
    <div className="h-full w-full overflow-x-hidden bg-[#f7f7f8]">
      <a
        href="https://github.com/adedoyin-emmanuel/fimicheck"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-0 right-0 z-50"
        aria-label="View source on GitHub"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          className="fill-[#cb6441] text-white"
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            className="origin-[130px_106px] scale-[0.7]"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="origin-[130px_106px] scale-[0.7]"
          />
        </svg>
      </a>
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

        {!result?.data ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={8}
                  value={plateNumber}
                  onChange={(value) => setPlateNumber(value.toUpperCase())}
                  className="gap-1 sm:gap-3"
                  containerClassName="gap-2 sm:gap-4"
                >
                  <InputOTPGroup className="gap-2 sm:gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
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
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => {
                  setResult(null);
                  setPlateNumber("");
                }}
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
                    <span className={`${afacad.className} font-medium`}>
                      Make
                    </span>
                  </div>
                  <p
                    className={`text-2xl sm:text-3xl font-bold  ${afacad.className}`}
                  >
                    {result.data.vehicleInfo.make}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    <span className={`${afacad.className} font-medium`}>
                      Color
                    </span>
                  </div>
                  <p
                    className={`text-2xl sm:text-3xl font-bold  ${afacad.className}`}
                  >
                    {result.data.vehicleInfo.color}
                  </p>
                </div>
              </div>
            </div>
            {result.data.images && result.data.images.length > 0 && (
              <div className="rounded p-6 sm:p-8 border-[1px]">
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-6 ${afacad.className}`}
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
                        <div className="absolute bottom-0 left-0 right-0 bg-[#cb6441] opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p
                              className={`text-sm sm:text-base text-white font-semibold line-clamp-2 ${afacad.className}`}
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
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-[#cb6441] hover:bg-[#cb6441]/90 text-white shadow-lg"
                    onClick={handleNextImage}
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
      </main>
      <footer className="py-6 text-center text-[15px] text-muted-foreground">
        <p className={afacad.className}>
          Built with ❤️ by{" "}
          <a
            href="https://adedoyinemmanuel.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#cb6441] hover:underline"
          >
            Adedoyin Emmanuel Adeniyi
          </a>
        </p>
      </footer>
    </div>
  );
}
