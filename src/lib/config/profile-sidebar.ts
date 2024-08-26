import { BagTick, Logout, Setting2 } from "iconsax-react";
import { ProfileSidebar } from "../types/profile-sidebar-types";


export const profileSidebarData: ProfileSidebar[] = [
  {
    id: "ps-1",
    name: "My Products",
    icon: BagTick,
    path: "/profile/my-products"
  },
  {
    id: "ps-2",
    name: "Settings",
    icon: Setting2,
    path: "/profile/settings"
  },
  {
    id: "ps-3",
    name: "Log out",
    icon: Logout,
    path: ""
  }
]