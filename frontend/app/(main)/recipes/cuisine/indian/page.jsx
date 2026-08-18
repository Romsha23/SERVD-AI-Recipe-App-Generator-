"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DISH_REGISTRY } from "@/lib/dishRegistry";

const indianDishes = DISH_REGISTRY["indian"] || [];

export default function IndianCuisinePage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-14 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">

        {/* Header — same as RecipeGrid */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
            Indian{" "}
            <span className="text-orange-600">Cuisine</span>
          </h1>

          <p className="text-stone-600 mt-2">
            {indianDishes.length} delicious Indian dishes to try
          </p>
        </div>

        {/* Grid — same 4-col layout as RecipeGrid, matching RecipeCard grid variant */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {indianDishes.map((dish) => (
            <Link
              key={dish.name}
              href={`/recipe?cook=${encodeURIComponent(dish.name)}`}
              className="group"
            >
              {/* Card — identical to RecipeCard grid variant */}
              <div className="rounded-none overflow-hidden border border-stone-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer pt-0">

                {/* Square image */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    quality={90}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">
                        Click to view recipe
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title — same as CardHeader > CardTitle in RecipeCard */}
                <div className="p-4 pb-5">
                  <p className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                    {dish.name}
                  </p>
                  <p className="text-xs font-semibold text-rose-700 mt-1">
                    {dish.region}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
