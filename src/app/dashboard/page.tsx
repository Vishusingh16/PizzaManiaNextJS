'use client' // Needed for useState and event handlers

import { useState, useEffect } from "react" // Added useEffect for toast timeout
// For client-side session, you'd usually use useSession() from 'next-auth/react'
// import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Assuming you have a Button component from ShadCN UI
import Image from "next/image" // For pizza images

// Sample pizza data
const samplePizzas = [
  { id: 1, name: "Margherita Classic", price: 10.99, image:"/images/pizza1.jpg", description: "Classic delight with fresh mozzarella and basil." },
  { id: 2, name: "Pepperoni Feast", price: 12.99, image: "/images/pizza2.jpg", description: "Loaded with savory pepperoni slices." },
  { id: 3, name: "Veggie Supreme", price: 11.99, image:"/images/pizza3.jpg", description: "A garden of fresh vegetables on a pizza." },
  { id: 4, name: "BBQ Chicken Blast", price: 13.99, image: "/images/pizza4.jpg", description: "Tangy BBQ sauce, chicken, and red onions." },
  { id: 5, name: "Spicy Diablo", price: 13.49, image: "/images/piza5.jpg", description: "For the brave: jalapeños, spicy sausage, and chili flakes." }, // Ensure "piza5.jpg" is correct
  { id: 6, name: "Four Cheese Melt", price: 12.49, image: "/images/pizza6.jpg", description: "A creamy blend of four delicious cheeses." },
]

// Ensure images exist in public/images/ or they will not load.
// E.g., public/images/pizza1.jpg, public/images/pizza2.jpg, etc.
// Or use a placeholder like: `https://via.placeholder.com/300x200.png?text=${encodeURIComponent(pizza.name)}`

export default function DashboardPage() {
  const [user, setUser] = useState<{ name?: string | null }>({ name: "Pizza Fan" }); // Mock user
  const [cartItemCount, setCartItemCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info'); // For styling toast

  // Effect to clear toast message after a delay
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 1500); // Hide after 3 seconds
      return () => { // Cleanup timer if component unmounts or toastMessage changes again
        clearTimeout(timer);
      };
    }
  }, [toastMessage]); // Re-run effect only if toastMessage changes

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleAddToCart = (pizzaName: string) => {
    setCartItemCount(prevCount => prevCount + 1);
    showToast(`${pizzaName} added to cart!`, 'success');
  };

  const handleRemoveFromCart = (pizzaName: string) => {
    if (cartItemCount > 0) {
      setCartItemCount(prevCount => prevCount - 1);
      showToast(`${pizzaName} removed from cart.`, 'info');
    } else {
      showToast('Cart is already empty!', 'error');
    }
  };

  return (
    <div
      className="
        space-y-10 p-2 sm:p-4
        bg-gradient-to-br from-yellow-100/50 via-orange-100/50 to-red-100/50
        dark:from-slate-800/70 dark:via-neutral-800/60 dark:to-stone-800/50
        min-h-full relative
      "
    >
      {/* Toast Message Display - Centered */}
      {toastMessage && (
        <div 
          className="
            fixed inset-0 z-[1000] /* High z-index, cover entire screen */
            flex items-center justify-center /* Center the inner toast box */
            bg-black/30 backdrop-blur-sm /* Optional: overlay for focus */
            p-4 
            animate-[fadeIn_0.3s_ease-out_forwards] /* Simple fade-in for the overlay */
          "
          // onClick={() => setToastMessage(null)} // Optional: click overlay to dismiss
        >
          <div
            id="dashboard-toast-content" // ID for the actual toast content box
            className={`
              p-6 rounded-xl shadow-2xl text-white font-semibold
              min-w-[300px] max-w-md text-center 
              /* Applying background colors directly */
              ${toastType === 'success' ? 'bg-green-500 dark:bg-green-600' : ''}
              ${toastType === 'error' ? 'bg-red-500 dark:bg-red-600' : ''}
              ${toastType === 'info' ? 'bg-sky-500 dark:bg-sky-600' : ''}
              /* Animation for the toast box itself coming in */
              animate-[fadeInSlideUp_0.4s_ease-out_forwards] 
            `}
            // Prevent click on toast box from closing via overlay click
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Optional: Icon based on toastType */}
            {/* <div className="mb-2 text-2xl">
              {toastType === 'success' && '🎉'}
              {toastType === 'error' && '😟'}
              {toastType === 'info' && 'ℹ️'}
            </div> */}
            {toastMessage}
          </div>
        </div>
      )}

      {/* Page Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 animate-[fadeInSlideUp_0.5s_ease-out_forwards]">
          <span className="text-5xl sm:text-6xl" role="img" aria-label="pizza slice">🍕</span>
          <h1 className="text-5xl sm:text-6xl font-['Lilita_One',_cursive] font-bold text-orange-600 dark:text-orange-400 text-shadow-sm tracking-tight">
            Your Lookout
          </h1>
        </div>
        <div className="text-right animate-[fadeInSlideUp_0.6s_ease-out_forwards]">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            Cart Items:
            <span className="ml-2 text-2xl font-bold text-green-600 dark:text-green-400 bg-white dark:bg-slate-700 px-3 py-1 rounded-full shadow-md">
              {cartItemCount}
            </span>
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <Card
        className="
          bg-amber-50/90 dark:bg-slate-800/80
          border-2 border-amber-400 dark:border-amber-600
          shadow-xl rounded-xl
          animate-[fadeInSlideUp_0.7s_ease-out_0.2s_forwards]
        "
      >
        <CardHeader className="pb-4">
          <CardTitle
            className="
              text-3xl sm:text-4xl font-['Lilita_One',_cursive]
              text-red-600 dark:text-red-400
              tracking-wide
            "
          >
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 space-y-3">
          <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Adios, <span className="text-orange-500 dark:text-orange-400">{user?.name || "Pizza Lover"}</span>!
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Your pizza command center awaits! Manage orders, tweak faves, or find your next topping crush.
          </p>
        </CardContent>
      </Card>

      {/* Pizza Grid Section */}
      <section className="space-y-6 animate-[fadeInSlideUp_0.7s_ease-out_0.4s_forwards]">
        <h2 className="text-4xl font-['Lilita_One',_cursive] text-red-700 dark:text-red-500 text-center tracking-wider">
          Today's Specials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {samplePizzas.map((pizza, index) => (
            <Card
              key={pizza.id}
              className="
                bg-white/90 dark:bg-slate-800/90
                border border-amber-300 dark:border-slate-700
                shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg
                overflow-hidden flex flex-col
                animate-[fadeInSlideUp_0.5s_ease-out_forwards]
              "
              style={{ animationDelay: `${0.5 + index * 0.1}s` }} // Staggered animation
            >
              <div className="relative w-full h-48 sm:h-56">
                <Image
                  src={pizza.image || `https://via.placeholder.com/300x200.png?text=${encodeURIComponent(pizza.name)}`}
                  alt={pizza.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-2xl font-['Lilita_One',_cursive] text-orange-700 dark:text-orange-400">
                  {pizza.name}
                </CardTitle>
                <CardDescription className="text-sm text-slate-600 dark:text-slate-400 pt-1 h-12 overflow-hidden">
                  {pizza.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-1 pb-3">
                <p className="text-xl font-semibold text-green-700 dark:text-green-400">
                  ${pizza.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="pt-0 pb-4 px-4 flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => handleAddToCart(pizza.name)}
                  className="
                    w-full sm:flex-1 bg-red-600 hover:bg-red-700
                    dark:bg-red-500 dark:hover:bg-red-600
                    text-white font-semibold text-lg py-3
                    font-['Lilita_One',_cursive] tracking-wider
                  "
                >
                  Add 🍕
                </Button>
                <Button
                  onClick={() => handleRemoveFromCart(pizza.name)}
                  disabled={cartItemCount === 0} // Disable if cart is empty
                  className="
                    w-full sm:flex-1 bg-slate-400 hover:bg-slate-500
                    dark:bg-slate-600 dark:hover:bg-slate-700
                    text-white font-semibold text-lg py-3
                    font-['Lilita_One',_cursive] tracking-wider
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Existing Cards for Recent Orders and Special Offers */}
      <div className="grid gap-6 md:grid-cols-2 animate-[fadeInSlideUp_0.7s_ease-out_0.6s_forwards]">
        <Card className="bg-red-100/70 dark:bg-red-900/50 border-red-300 dark:border-red-700 shadow-lg rounded-lg">
          <CardHeader><CardTitle className="text-xl font-['Lilita_One',_cursive] text-red-700 dark:text-red-400">Recent Orders</CardTitle></CardHeader>
          <CardContent><p className="text-slate-600 dark:text-slate-400">Your latest pizza adventures appear here...</p></CardContent>
        </Card>
        <Card className="bg-green-100/70 dark:bg-green-900/50 border-green-300 dark:border-green-700 shadow-lg rounded-lg">
          <CardHeader><CardTitle className="text-xl font-['Lilita_One',_cursive] text-green-700 dark:text-green-400">Special Offers</CardTitle></CardHeader>
          <CardContent><p className="text-slate-600 dark:text-slate-400">Don't miss out on these delicious deals!</p></CardContent>
        </Card>
      </div>

    </div>
  )
}