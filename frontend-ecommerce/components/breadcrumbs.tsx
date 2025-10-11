"use client"
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {/* Home */}
        <li className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </>
              ) : (
                <span className="text-gray-900 dark:text-white font-semibold">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
