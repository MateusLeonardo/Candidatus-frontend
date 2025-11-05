import SidenavDashboard from "@/components/layout/dashboard/sidenav-dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      <SidenavDashboard />
      <main className="flex-1">{children}</main>
    </div>
  );
}
