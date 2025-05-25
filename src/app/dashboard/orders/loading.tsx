// export default function Loading() {
//     return null
// }
  

import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-50/50 dark:bg-slate-900/80 p-4">
      <div className="space-y-6 text-center">
        {/* Animated Pizza Spinner */}
        <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
          {/* Base of the pizza (crust color) */}
          <div className="absolute inset-0 animate-spin rounded-full border-8 border-amber-400 dark:border-amber-500"
               style={{ animationDuration: '1.5s' }}>
          </div>
          {/* Sauce/Cheese Layer */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-500 to-orange-400 dark:from-red-600 dark:to-orange-500">
          </div>
          
          {/* Pepperoni Toppings (example) - can add more or use an SVG */}
          <div className="absolute top-[20%] left-[25%] h-5 w-5 rounded-full bg-rose-700 dark:bg-rose-600 shadow-sm"></div>
          <div className="absolute top-[45%] left-[60%] h-5 w-5 rounded-full bg-rose-700 dark:bg-rose-600 shadow-sm"></div>
          <div className="absolute bottom-[22%] left-[45%] h-4 w-4 rounded-full bg-rose-700 dark:bg-rose-600 shadow-sm"></div>

          {/* Green Pepper Toppings (example) */}
          <div className="absolute top-[60%] left-[18%] h-3 w-3 rounded-full bg-green-600 dark:bg-green-500 shadow-sm"></div>
          <div className="absolute top-[30%] right-[20%] h-3 w-3 rounded-full bg-green-600 dark:bg-green-500 shadow-sm"></div>
        </div>

        {/* Loading Text */}
        <div className="animate-[fadeInSlideUp_0.7s_ease-out_forwards_0.3s] opacity-0">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Lilita_One',_cursive] text-orange-600 dark:text-orange-400">
            Whipping up your dashboard...
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Just a moment, the oven is heating up!
          </p>
        </div>
      </div>
    </div>
  );
}

