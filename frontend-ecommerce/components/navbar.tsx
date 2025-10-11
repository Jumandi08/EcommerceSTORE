"use client";
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { useAuth } from "@/hooks/use-auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CartPreview from "./cart-preview";
import FavoritesPreview from "./favorites-preview";
import ProfilePreview from "./profile-preview";
const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cart = useCart ()
  const {lovedItems} = UseLovedProducts ()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  // Estados para controlar los popovers
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Timeouts para el hover
  const cartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const favoritesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Funciones para manejar el hover con cancelación cruzada
  const handleCartEnter = () => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
    if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setFavoritesOpen(false);
    setProfileOpen(false);
    setCartOpen(true);
  };

  const handleCartLeave = () => {
    cartTimeoutRef.current = setTimeout(() => {
      setCartOpen(false);
    }, 300);
  };

  const handleFavoritesEnter = () => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
    if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setCartOpen(false);
    setProfileOpen(false);
    setFavoritesOpen(true);
  };

  const handleFavoritesLeave = () => {
    favoritesTimeoutRef.current = setTimeout(() => {
      setFavoritesOpen(false);
    }, 300);
  };

  const handleProfileEnter = () => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
    if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setCartOpen(false);
    setFavoritesOpen(false);
    setProfileOpen(true);
  };

  const handleProfileLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileOpen(false);
    }, 300);
  };

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
        Ansa
        <span className="font-bold">yan</span>
      </h1>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {/* Cart Icon with Popover */}
        <Popover open={cartOpen} onOpenChange={setCartOpen}>
          <PopoverTrigger asChild>
            <div
              onMouseEnter={handleCartEnter}
              onMouseLeave={handleCartLeave}
              onClick={() => router.push('/cart')}
              className="cursor-pointer relative group"
            >
              <div className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                <ShoppingCart
                  strokeWidth="1.5"
                  className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                />
                {cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-rose-500 to-rose-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-in zoom-in-50 duration-200 ring-2 ring-white dark:ring-gray-900">
                    {cart.items.length > 99 ? '99+' : cart.items.length}
                  </span>
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-auto"
            align="end"
            sideOffset={8}
            onMouseEnter={handleCartEnter}
            onMouseLeave={handleCartLeave}
          >
            <CartPreview />
          </PopoverContent>
        </Popover>

        {/* Favorites Icon with Popover */}
        <Popover open={favoritesOpen} onOpenChange={setFavoritesOpen}>
          <PopoverTrigger asChild>
            <div
              onMouseEnter={handleFavoritesEnter}
              onMouseLeave={handleFavoritesLeave}
              onClick={() => router.push('/loved-products')}
              className="cursor-pointer relative group"
            >
              <div className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Heart
                  strokeWidth="1.5"
                  className={`w-6 h-6 transition-all duration-200 group-hover:scale-110 ${
                    lovedItems.length > 0
                      ? 'fill-rose-500 stroke-rose-500 dark:fill-rose-400 dark:stroke-rose-400'
                      : 'group-hover:fill-rose-100 dark:group-hover:fill-rose-900/30'
                  }`}
                />
                {lovedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-rose-500 to-rose-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-in zoom-in-50 duration-200 ring-2 ring-white dark:ring-gray-900">
                    {lovedItems.length > 99 ? '99+' : lovedItems.length}
                  </span>
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-auto"
            align="end"
            sideOffset={8}
            onMouseEnter={handleFavoritesEnter}
            onMouseLeave={handleFavoritesLeave}
          >
            <FavoritesPreview />
          </PopoverContent>
        </Popover>

        {/* Profile Icon with Popover */}
        {isAuthenticated ? (
          <Popover open={profileOpen} onOpenChange={setProfileOpen}>
            <PopoverTrigger asChild>
              <div
                onMouseEnter={handleProfileEnter}
                onMouseLeave={handleProfileLeave}
                onClick={() => router.push('/profile')}
                className="cursor-pointer relative group"
              >
                <div className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User
                    strokeWidth="1.5"
                    className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-auto"
              align="end"
              sideOffset={8}
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
            >
              <ProfilePreview />
            </PopoverContent>
          </Popover>
        ) : (
          <div className="cursor-pointer relative group" onClick={() => router.push('/auth/login')}>
            <div className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              <User
                strokeWidth="1.5"
                className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          </div>
        )}

        <ToggleTheme/>
      </div>
    </div>
  );
};

export default Navbar;
