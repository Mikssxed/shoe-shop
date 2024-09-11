"use client";
import SideImageLayout from "@/components/common/SideImageLayout";
import { IMAGE_SRCS } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pathImageMap: Record<string, string | undefined> = {
    "/auth/forgot-password": IMAGE_SRCS.FORGOT_PASSWORD_SIDE,
    "/auth/sign-in": IMAGE_SRCS.SIGN_IN_SIDE,
    "/auth/reset-password": IMAGE_SRCS.RESET_PASSWORD_SIDE,
    "/auth/sign-up": IMAGE_SRCS.SIGN_UP_SIDE,
  };

  const imageSrc = pathImageMap[pathname] || "";

  return <SideImageLayout imageSrc={imageSrc}>{children}</SideImageLayout>;
}
