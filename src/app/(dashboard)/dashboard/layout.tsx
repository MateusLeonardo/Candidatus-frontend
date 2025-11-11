import SidenavDashboard from "@/components/layout/dashboard/sidenav-dashboard";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      <SidenavDashboard />
      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
