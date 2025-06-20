"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Afacad } from "next/font/google";

import { Header } from "@/components/header";
import { ImageModal } from "@/components/image-modal";
import { VehicleImages } from "@/components/vehicle-images";
import { VehicleDetails } from "@/components/vehicle-details";
import { VehicleLookupForm } from "@/components/vehicle-lookup-form";

const afacad = Afacad({
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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<VehicleImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLookup = async (plateNumber: string) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/v1/lookup", {
        plateNumber,
      });
      setResult(response.data);
    } catch {
      toast.error("Failed to lookup plate number. Please try again.", {
        style: {
          background: "white",
          color: "#1a1a1a",
          border: "1px solid rgba(203, 100, 65, 0.15)",
          boxShadow: "0 4px 12px rgba(203, 100, 65, 0.05)",
        },
      });
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

  const handleReset = () => {
    setResult(null);
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="h-full w-full overflow-x-hidden bg-[#f7f7f8]">
      <Link
        href="https://github.com/adedoyin-emmanuel/fimicheck"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-0 right-0 z-50"
        aria-label="View source code on GitHub"
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
      </Link>
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <Header />

        {!result?.data ? (
          <VehicleLookupForm onLookup={handleLookup} loading={loading} />
        ) : (
          <>
            <VehicleDetails
              vehicleInfo={result.data.vehicleInfo}
              onReset={handleReset}
            />
            <br />
            <VehicleImages
              images={result.data.images}
              onImageClick={handleImageClick}
            />
          </>
        )}

        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
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
