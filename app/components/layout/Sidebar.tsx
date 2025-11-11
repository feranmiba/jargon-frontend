"use client";

import React, { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { LucideProps } from "lucide-react";

interface SidebarItem {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  text: string;
  href: string;
  iconFilled?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

interface DesktopSidebarProps {
  sidebarItems: SidebarItem[];
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  pathname: string;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
  sidebarItems,
  sidebarExpanded,
  pathname,
}) => {
  return (
    <aside className="fixed z-20 left-0 top-0 bg-app-white hidden h-screen flex-col shadow-md md:flex transition-all duration-300 ease-in-out">
      <div className="flex h-full flex-col gap-y-2 overflow-y-auto">
        <div className="flex w-full flex-col gap-y-2 mt-20 p-8">
          {sidebarItems.map((item, index) => {
            const Icon = pathname === item.href && item.iconFilled
              ? item.iconFilled
              : item.icon;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center py-4 text-primary ${
                  pathname === item.href ? "link-hover" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarExpanded && <span className="ml-4">{item.text}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
