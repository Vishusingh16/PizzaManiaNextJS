"use client"

import { signIn } from "next-auth/react"
import { Button, type ButtonProps } from "@/components/ui/button" // Assuming ButtonProps can be imported for variant
import { ChromeIcon as Google } from "lucide-react" // Keeping lucide-react for the icon
import { useState } from "react"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      // Optionally, show a toast or UI error message here
      console.error("Login failed:", error)
      setIsLoading(false) // Ensure loading is false on error
    }
    // finally { // Removed finally as setIsLoading(false) is handled in try/catch
    //   setIsLoading(false)
    // }
  }

  // Custom loading spinner (could be an SVG or more complex animation)
  const PizzaSpinner = () => (
    <div className="relative h-5 w-5 animate-spin" style={{ animationDuration: '1.2s' }}>
      <div className="absolute inset-0 rounded-full border-2 border-amber-300"></div>
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-red-400 to-orange-300"></div>
      <div className="absolute top-[25%] left-[25%] h-[0.4rem] w-[0.4rem] rounded-full bg-rose-600"></div>
      <div className="absolute bottom-[25%] right-[25%] h-[0.4rem] w-[0.4rem] rounded-full bg-rose-600"></div>
    </div>
  );

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      // Remove default variant if you're fully custom styling, or use a custom variant
      // variant="outline" 
      size="lg" // Keep size for padding consistency or define custom padding
      className={`
        w-full 
        h-14 sm:h-16 px-6 sm:px-8 py-3 sm:py-4
        text-base sm:text-lg font-semibold text-white
        rounded-full shadow-lg 
        cursor-pointer
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-offset-0 
        ${isLoading
          ? 'bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 dark:from-red-600 dark:via-orange-600 dark:to-amber-500 dark:hover:from-red-700 dark:hover:via-orange-700 dark:hover:to-amber-600 focus:ring-orange-300 dark:focus:ring-orange-400'
        }
        transform hover:scale-105 active:scale-95 active:shadow-inner
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-3">
          <PizzaSpinner />
          Signing in...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-3">
          <Google className="h-6 w-6 text-white/90" />
          Sign in with Google
        </span>
      )}
    </Button>
  )
}