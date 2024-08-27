import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileSidebar> 
      {children}
    </ProfileSidebar>
  )
}