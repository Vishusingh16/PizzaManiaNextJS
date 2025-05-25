import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { LoginButton } from "@/components/login-button"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
 <main
  className="
    relative overflow-hidden 
    flex min-h-screen flex-col items-center justify-center p-4 
    bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400
    text-slate-900
  "
>




      {/* Extra Container for Shaped Background Elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Background Element 1: Large Primary Circle (Subtle Gradient) */}
        <div
          className="
            absolute -top-1/2 -left-1/4 
            w-[150%] h-[150%] 
            sm:w-[120%] sm:h-[120%]
            rounded-full
            bg-gradient-radial from-purple-600/40 via-purple-600/10 to-transparent
            dark:from-purple-700/30 dark:via-purple-700/5 dark:to-transparent
            animate-[pulse_12s_ease-in-out_infinite]
          "
        ></div>

        {/* Background Element 2: Smaller Accent Circle (Vibrant) */}
        <div
          className="
            absolute -bottom-1/3 -right-1/4
            w-[100%] h-[100%] 
            sm:w-[80%] sm:h-[80%]
            rounded-full
            bg-gradient-radial from-pink-500/50 via-pink-500/15 to-transparent
            dark:from-pink-600/40 dark:via-pink-600/10 dark:to-transparent
            animate-[pulse_15s_ease-in-out_infinite_3s] // 3s delay
          "
        ></div>

        {/* Background Element 3: Subtle "Beam" or "Shade" - Angled Gradient */}
        <div
          className="
            absolute top-0 left-0 w-full h-full
            bg-gradient-to-br 
            from-sky-500/20 via-transparent/0 to-transparent/0
            dark:from-sky-600/15 dark:via-transparent/0 dark:to-transparent/0
            transform -skew-y-12 origin-top-left // Creates an angled shade
            opacity-75
          "
        ></div>

        {/* Background Element 4: Another Subtle "Beam" from opposite direction */}
        <div
          className="
            absolute top-0 right-0 w-full h-full
            bg-gradient-to-tl
            from-teal-400/20 via-transparent/0 to-transparent/0
            dark:from-teal-500/15 dark:via-transparent/0 dark:to-transparent/0
            transform skew-y-12 origin-top-right // Angled shade from other side
            opacity-60
          "
        ></div>
        
        {/* Optional: Subtle grid lines or star-like points if desired (more complex inline) */}
        {/* For a more structured "shade" or "strip" effect, you could add more transformed divs */}

      </div>

      {/* Pizza Container */}
      <div
        className="
          relative z-10
          w-full max-w-md aspect-square 
          rounded-full 
          shadow-2xl 
          overflow-hidden
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(245,158,11,0.2)]
        "
      >
        {/* ... (rest of your pizza card content) ... */}
        <div
          className="
            w-full h-full 
            rounded-full 
            bg-amber-400 dark:bg-amber-600
            p-4 sm:p-6 md:p-8
            flex items-center justify-center
          "
        >
          <div
            className="
              w-full h-full 
              rounded-full 
              bg-red-600 dark:bg-red-700
              p-6 sm:p-8
              flex flex-col items-center justify-center 
              space-y-6
              text-center
            "
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-yellow-50 dark:text-yellow-100 animate-pulse">
                Pizza Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base text-yellow-200 dark:text-yellow-300">
                Sign in to slice into your dashboard!
              </p>
            </div>
            <div className="flex flex-col space-y-4 w-3/4 sm:w-2/3">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}