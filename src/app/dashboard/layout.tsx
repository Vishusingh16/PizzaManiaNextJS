'use client' // This component now needs client-side interactivity

import type React from "react"
import { useState, useEffect, useRef } from "react" // Added for menu state
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react" // Preferred for client components
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react" // Icons

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
  
  const [isNavOpen, setIsNavOpen] = useState(false); // State for the top nav bar
  const navRef = useRef<HTMLDivElement>(null);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-yellow-50/30 dark:bg-slate-900/80">
        <p className="text-xl font-semibold text-orange-600">Loading session...</p>
      </div>
    );
  }

  // Function to handle closing the nav, to be passed to DashboardNav
  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-yellow-50/30 dark:bg-slate-900/80 font-sans">
      {/* Header (remains the same) */}
      <header
        className="
          sticky top-0 z-20 border-b-4 
          border-amber-500 dark:border-amber-600 
          bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 
          dark:from-red-700 dark:via-orange-600 dark:to-amber-500
          text-white shadow-lg
        "
      >
        <div className="container mx-auto grid h-20 grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6">
          <div className="flex items-center">
            <span className="text-3xl" role="img" aria-label="pizza slice">🍕</span>
          </div>
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
          <div className="flex items-center justify-end gap-4">
            <ModeToggle />
            {session?.user && <UserNav user={session.user} />}
          </div>
        </div>
      </header>

      {/* Top Toggle Navigation Bar */}
      <nav 
        ref={navRef}
        className="sticky top-20 z-10 border-b-2 border-amber-300/70 dark:border-slate-700/50 bg-amber-100/80 dark:bg-slate-800/70 shadow-md backdrop-blur-sm"
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5"> {/* Increased py slightly */}
          <div className="flex items-center gap-3">
             <GripVertical className="h-6 w-6 text-orange-600 dark:text-orange-400 hidden sm:block" />
            <div 
              className="
                inline-block bg-orange-500 dark:bg-orange-600 
                px-4 py-1.5 rounded-md shadow-sm
              "
            >
              <h2 
                className="
                  text-lg font-semibold text-white dark:text-yellow-50 
                  font-['Lilita_One',_cursive] tracking-wide
                "
              >
                Navigation
              </h2>
            </div>
          </div>
          
          {/* Styled Toggle Button in its own "Box" */}
          <div 
            className="
              bg-white/70 dark:bg-slate-700/50 
              rounded-lg shadow 
              border border-amber-300/50 dark:border-slate-600/50
            "
          >
            <Button
              variant="ghost" // Using ghost to allow custom background from parent
              size="sm" // Keep button size consistent
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="
                text-orange-700 dark:text-orange-300 
                hover:bg-amber-200/70 dark:hover:bg-slate-600/70
                active:bg-amber-300/70 dark:active:bg-slate-500/70
                font-semibold px-3 py-1.5 flex items-center gap-1.5
              "
              aria-expanded={isNavOpen}
              aria-controls="dashboard-top-nav-content"
            >
              {isNavOpen ? "Hide" : "Show"} Menu
              {isNavOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Collapsible Navigation Content */}
        <div
          id="dashboard-top-nav-content"
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isNavOpen ? 'max-h-[500px] opacity-100 py-3' : 'max-h-0 opacity-0 py-0'} {/* Adjusted max-h, added py transition */}
          `}
        >
          <div className="container mx-auto px-4 sm:px-6 border-t border-amber-200 dark:border-slate-600">
            <DashboardNav 
              onLinkClick={closeNav} // Pass the closeNav function
            />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container mx-auto flex flex-1">
        <main className="flex-1 p-6 md:p-8 lg:p-10 bg-white/80 dark:bg-slate-800/30 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  )
}