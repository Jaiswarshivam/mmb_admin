import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafbff] to-[#f8f9ff]">
      <div className="flex min-h-screen relative">
        <Sidebar expanded={sidebarExpanded} onToggleExpand={setSidebarExpanded} />

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Reuse Sidebar component for mobile with forced visibility */}
            <Sidebar
              expanded={true}
              onToggleExpand={() => {}}
              forceVisible={true}
              showToggleExpand={false}
              onItemClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        <div
          className={`flex flex-1 flex-col min-w-0 ${
            sidebarExpanded ? "md:ml-64" : "md:ml-16"
          }`}
        >
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 lg:px-8 pt-20 min-w-0">
            <div className="w-full min-w-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
