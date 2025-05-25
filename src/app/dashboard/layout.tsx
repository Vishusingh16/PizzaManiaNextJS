'use client' // This component now needs client-side interactivity

import type React from "react"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { DashboardNav } from "@/components/dashboard-nav"

import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X, PanelLeftOpen, PanelLeftClose } from "lucide-react" // Added Panel icons

// Font import suggestion (if not already done):
// @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;700&display=swap');

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/")
    },
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarFeatureEnabled, setIsSidebarFeatureEnabled] = useState(true) // New state for sidebar feature

  // Close sidebar if feature is disabled
  useEffect(() => {
    if (!isSidebarFeatureEnabled) {
      setIsSidebarOpen(false);
    }
  }, [isSidebarFeatureEnabled]);

  // Optional: Close sidebar on ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarFeatureEnabled) { // Only if feature is enabled
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isSidebarFeatureEnabled]); // Re-run if feature enabled status changes


  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-yellow-50/30 dark:bg-slate-900/80">
        <p className="text-xl font-semibold text-orange-600">Loading session...</p>
      </div>
    )
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebarFeature = () => setIsSidebarFeatureEnabled(!isSidebarFeatureEnabled)

  return (
    <div className="flex min-h-screen flex-col bg-yellow-50/30 dark:bg-slate-900/80 font-sans">
      {/* Header */}
      <header
        className="
          sticky top-0 z-30 border-b-4 
          border-amber-500 dark:border-amber-600 
          bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 
          dark:from-red-700 dark:via-orange-600 dark:to-amber-500
          text-white shadow-lg
        "
      >
        <div className="container mx-auto grid h-20 grid-cols-[auto_1fr_auto] items-center gap-x-3 px-4 sm:gap-x-4 sm:px-6">
          {/* Col 1: Left Aligned Items (Sidebar Toggle + Pizza Icon) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {isSidebarFeatureEnabled && (
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 active:bg-white/20"
                aria-expanded={isSidebarOpen}
                aria-controls="dashboard-sidebar"
              >
                {isSidebarOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                <span className="sr-only">{isSidebarOpen ? "Close menu" : "Open menu"}</span>
              </Button>
            )}
            <div className="flex items-center">
              <span className="text-3xl" role="img" aria-label="pizza slice">🍕</span>
            </div>
          </div>

          {/* Col 2: Center Aligned Title */}
          <div className="flex items-center justify-center">
            <div 
              className="
                bg-white/20 dark:bg-black/20 backdrop-blur-sm 
                px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg shadow-md
                border border-white/30 dark:border-black/30
                animate-[fadeInSlideUp_0.7s_ease-out_forwards]
              "
            >
              <h1 
                className="
                  text-2xl sm:text-3xl font-bold tracking-tight 
                  font-['Lilita_One',_cursive] text-shadow-sm text-white
                "
              >
                PizzaMania
              </h1>
            </div>
          </div>

          {/* Col 3: Right Aligned Items (Controls) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <Button
              onClick={toggleSidebarFeature}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 active:bg-white/20"
              title={isSidebarFeatureEnabled ? "Disable Sidebar Panel" : "Enable Sidebar Panel"}
            >
              {isSidebarFeatureEnabled ? <PanelLeftClose className="h-6 w-6" /> : <PanelLeftOpen className="h-6 w-6" />}
              <span className="sr-only">{isSidebarFeatureEnabled ? "Disable sidebar panel" : "Enable sidebar panel"}</span>
            </Button>
            <ModeToggle />
            {session?.user && <UserNav user={session.user} />}
          </div>
        </div>
      </header>

      {/* Sidebar Navigation (Conditionally Rendered) */}
      {isSidebarFeatureEnabled && (
        <aside
          id="dashboard-sidebar"
          className={`
            fixed top-0 left-0 z-50 h-full w-72 
            transform transition-transform duration-300 ease-in-out
            bg-white dark:bg-slate-900 shadow-xl
            pt-20 /* Header height */
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-full flex-col overflow-y-auto p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 
                className="
                  text-xl font-bold text-orange-600 dark:text-orange-400 
                  font-['Lilita_One',_cursive] tracking-wide
                "
              >
                Menu
              </h2>
              <Button
                  onClick={closeSidebar}
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 dark:text-slate-400 md:hidden"
              >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <DashboardNav 
           onLinkClick={closeSidebar} 
            />
          </div>
        </aside>
      )}

      {/* Overlay for mobile (Conditionally Rendered) */}
      {isSidebarFeatureEnabled && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Area */}
      <div 
        className={`
          flex-1 transition-all duration-300 ease-in-out 
          ${isSidebarFeatureEnabled && isSidebarOpen ? "md:ml-72" : "ml-0"}
          pt-20 /* Account for sticky header height */
        `}
      >
        <div className="container mx-auto">
          <main className="flex-1 p-6 md:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/30 backdrop-blur-sm rounded-t-lg md:rounded-lg shadow-inner">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}