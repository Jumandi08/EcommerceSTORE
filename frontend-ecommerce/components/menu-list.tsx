"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useGetCategories } from "@/api/getCategories"
import { useGetSubcategories } from "@/api/getSubcategories"
import { Loader2, Headphones, Zap, ShieldCheck, Package } from "lucide-react"



// Mapa de iconos para subcategorías
const iconMap: Record<string, React.ReactNode> = {
  'Headphones': <Headphones className="h-5 w-5" />,
  'Zap': <Zap className="h-5 w-5" />,
  'ShieldCheck': <ShieldCheck className="h-5 w-5" />,
  'Package': <Package className="h-5 w-5" />,
}

const  MenuList = () => {
  const { loading, result: categories, error } = useGetCategories()
  const { loading: loadingSubcategories, result: subcategories, error: errorSubcategories } = useGetSubcategories('accesorios')

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/">
                    <div className="mb-2 mt-4 text-lg font-medium">
                      MobileStore
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Somos una empresa que busca ofrecerte la calidad precio de los productos que ofrecemos.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/sobre-nosotros" title="Sobre Nosotros">
                Conoce más sobre nuestra empresa, misión, visión y valores.
              </ListItem>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu informacion, tus pedidos y mucho mas.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Seccion dedicada a promociones y descuentos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Comprar por categoría</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {loading ? (
                <li className="col-span-2 flex items-center justify-center p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Cargando categorías...</span>
                </li>
              ) : error ? (
                <li className="col-span-2 p-6 text-center text-sm text-destructive">
                  Error al cargar categorías
                </li>
              ) : categories && categories.length > 0 ? (
                categories.map((category) => (
                  <ListItem
                    key={category.id}
                    title={category.categoryName}
                    href={`/category/${category.slug}`}
                  >
                    Explora todos los productos de {category.categoryName}
                  </ListItem>
                ))
              ) : (
                <li className="col-span-2 p-6 text-center text-sm text-muted-foreground">
                  No hay categorías disponibles
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Accesorios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {loadingSubcategories ? (
                <li className="col-span-2 flex items-center justify-center p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Cargando accesorios...</span>
                </li>
              ) : errorSubcategories ? (
                <li className="col-span-2 p-6 text-center text-sm text-destructive">
                  Error al cargar subcategorías
                </li>
              ) : subcategories && subcategories.length > 0 ? (
                <>
                  {/* Header del mega menú */}
                  <li className="col-span-2 mb-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <Package className="h-5 w-5 text-rose-600" />
                      <h3 className="font-semibold text-lg">Todos los Accesorios</h3>
                    </div>
                  </li>

                  {/* Subcategorías */}
                  {subcategories.map((subcategory) => (
                    <ListItemWithIcon
                      key={subcategory.id}
                      title={subcategory.subcategoryName}
                      href={`/subcategory/${subcategory.slug}`}
                      icon={iconMap[subcategory.icon || 'Package'] || iconMap['Package']}
                    >
                      {subcategory.description || `Descubre ${subcategory.subcategoryName}`}
                    </ListItemWithIcon>
                  ))}

                  {/* Ver todo */}
                  <li className="col-span-2 mt-2 pt-2 border-t">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/category/accesorios"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-center font-medium text-rose-600"
                      >
                        Ver todos los accesorios →
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </>
              ) : (
                <li className="col-span-2 p-6 text-center text-sm text-muted-foreground">
                  No hay subcategorías disponibles
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default MenuList

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const ListItemWithIcon = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon && <span className="text-rose-600">{icon}</span>}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ml-7">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItemWithIcon.displayName = "ListItemWithIcon"


