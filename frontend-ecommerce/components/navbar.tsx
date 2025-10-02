"use client";
import { BaggageClaim, Heart, ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cart = useCart ()
  const {lovedItems} = UseLovedProducts ()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()


  useEffect(() => {
    setMounted(true);
  }, []);

  // Renderizar una versión simplificada durante la hidratación
  if (!mounted) {
    return (
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w6xl">
        <h1 className="text-3xl">
          Mobile
          <span className="font-bold">Shop</span>
        </h1>
        <div className="flex items-center justify-between gap-2 sm:gap-7">
          <div className="w-6 h-6"></div>
          <div className="w-6 h-6"></div>
          <div className="w-6 h-6"></div>
          <div className="w-6 h-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w6xl">
      <h1 className="text-3xl" onClick={() => router.push("/")}>
        Mobile
        <span className="font-bold">Shop</span>
      </h1>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-7">
       {cart.items.length === 0 ? 
       <ShoppingCart
       strokeWidth="1"
       className="cursor-pointer"
       onClick={() => router.push("/cart")}
     />
       : (
        <div className="flex gap-1" onClick={() => router.push("/cart") }>
          <BaggageClaim strokeWidth={1} className="cursor-poniter"/>
          <span>{cart.items.length}</span>

        </div>

       )} 
        

        <Heart
          strokeWidth="1"
          className={`cursor-pointer
          ${lovedItems.length > 0 && 'fill-black dark:fill-white'}`}
          onClick={() => router.push("/loved-products")}
        />

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <User strokeWidth={1} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.username || 'Mi Cuenta'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/orders')}>
                Mis Pedidos
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Panel Admin
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <User
            strokeWidth={1}
            className="cursor-pointer"
            onClick={() => router.push('/auth/login')}
          />
        )}

        <ToggleTheme/>
      </div>
    </div>
  );
};

export default Navbar;
