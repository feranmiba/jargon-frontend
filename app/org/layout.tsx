"use client";

import React from "react";
import Header from "../components/layout/Header";
import DesktopSidebar from "../components/layout/Sidebar";
import { Home, Database, ShieldCheck, User } from "lucide-react";

const sidebarItems = [
  {
    icon: Home,
    text: "Home",
    href: "/dashboard",
  },
  {
    icon: Database,
    text: "Add Data",
    href: "/dashboard/add-data",
  },
  {
    icon: ShieldCheck,
    text: "Request Data",
    href: "/dashboard/request",
  },
  {
    icon: User,
    text: "Profile",
    href: "/dashboard/profile",
  },
];

function StudentDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="bg-base min-h-screen flex flex-col">
    {/* Header */}
    <Header dashboardLinks={sidebarItems} pathname="/studentDashboard" />

    {/* Main Content Area */}
    <div className="flex flex-1 mt-16">
      <DesktopSidebar
        sidebarItems={sidebarItems}
        sidebarExpanded={true}
        toggleSidebar={() => {}}
        pathname="/studentDashboard"
      />

      {/* Main dashboard content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  </section>

  );
}

export default StudentDashboardLayout;