"use client";

import React from "react";
import Header from "../components/layout/Headers";
import DesktopSidebar from "../components/layout/Sidebar";
import { Home, Database, ShieldCheck, User } from "lucide-react";
import GeminiChat from "../components/GeminiChat";

const sidebarItems = [
  {
    icon: Home,
    text: "Home",
    href: "/org",
  },
  {
    icon: Database,
    text: "My users Data",
    href: "/org/user-data",
  },
  {
    icon: ShieldCheck,
    text: "Request Data",
    href: "/org/request",
  }
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


         <div className="fixed bottom-6 right-6 z-50">
                <GeminiChat />
              </div>
      </main>
    </div>
  </section>

  );
}

export default StudentDashboardLayout;