"use client"

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className=" text-primary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold gradient-text">Meblanje</h2>
        <button className="btn btn-primary bg-accent-green hover:bg-accent-green-dark">
          Add to Cart
        </button>
      </div>
      <ThemeToggle />
    </div>
  );
}
