import { Afacad } from "next/font/google";

import { ScrollArea } from "@/components/ui/scroll-area";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface VehicleImage {
  url: string;
  title: string;
}

interface VehicleImagesProps {
  images: VehicleImage[];
  onImageClick: (image: VehicleImage, index: number) => void;
}

export function VehicleImages({ images, onImageClick }: VehicleImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="rounded p-6 sm:p-8 border-[1px]">
      <h3
        className={`text-xl sm:text-2xl font-semibold mb-6 ${afacad.className}`}
      >
        Vehicle Images
      </h3>
      <ScrollArea className="h-[400px] sm:h-[600px] w-full rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => onImageClick(image, index)}
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
  );
}
