"use client"

import HeroModern from "@/components/hero-modern-full";
import FeaturesModern from "@/components/features-modern";
import CategoriesModern from "@/components/categories-modern";
import ProductsModern from "@/components/products-modern";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="px-4">
        <HeroModern/>
      </div>
      <FeaturesModern/>
      <CategoriesModern/>
      <ProductsModern/>
    </main>
  );
}
