"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: "white",
          color: "#1a1a1a",
          border: "1px solid rgba(203, 100, 65, 0.15)",
          boxShadow: "0 4px 12px rgba(203, 100, 65, 0.05)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#1a1a1a] group-[.toaster]:border-[rgba(203,100,65,0.15)] group-[.toaster]:shadow-sm",
          description: "group-[.toast]:text-[#666666]",
          actionButton:
            "group-[.toast]:bg-[#cb6441] group-[.toast]:text-white group-[.toast]:hover:bg-[#cb6441]/90",
          cancelButton:
            "group-[.toast]:bg-[#f5f5f5] group-[.toast]:text-[#666666] group-[.toast]:hover:bg-[#f0f0f0]",
          success:
            "group-[.toast]:bg-white group-[.toast]:text-[#1a1a1a] group-[.toast]:border-[rgba(203,100,65,0.15)]",
          error:
            "group-[.toast]:bg-white group-[.toast]:text-[#1a1a1a] group-[.toast]:border-[rgba(203,100,65,0.15)]",
        },
      }}
      style={
        {
          "--toast-icon-color": "#cb6441",
          "--toast-icon-success-color": "#cb6441",
          "--toast-icon-error-color": "#cb6441",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
