"use client";
import { usePathname } from "next/navigation";
import SideImageLayout from "@/components/SideImageLayout";
import { IMAGE_SRCS } from "@/lib/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pathImageMap: Record<string, string | undefined> = {
    "/forgot-password": IMAGE_SRCS.FORGOT_PASSWORD_SIDE,
    "/log-in": IMAGE_SRCS.LOG_IN_SIDE,
    "/reset-password": IMAGE_SRCS.RESET_PASSWORD_SIDE,
    "/sign-up": IMAGE_SRCS.SIGN_UP_SIDE,
  };

  const imageSrc = pathImageMap[pathname] || "";

  return <SideImageLayout imageSrc={imageSrc}>{children}</SideImageLayout>;
}
