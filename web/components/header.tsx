import { Afacad, Playfair_Display } from "next/font/google";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playwrightDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function Header() {
  return (
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
  );
}
