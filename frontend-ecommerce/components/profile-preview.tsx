"use client";

import { useRouter } from "next/navigation";
import { LogOut, User, Package, MapPin, Bell, Lock, Shield, CreditCard, Store, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

const ProfilePreview = () => {
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  const getInitials = () => {
    if (!user?.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  const menuSections = [
    {
      title: "Mi Cuenta",
      items: [
        { icon: User, label: "Perfil", section: "profile" },
        { icon: Package, label: "Mis Pedidos", section: "orders" },
      ]
    },
    {
      title: "Gestión",
      items: [
        { icon: MapPin, label: "Direcciones", section: "addresses" },
        { icon: Store, label: "Tiendas Seguidas", section: "followed-stores" },
      ]
    },
    {
      title: "Pagos y Seguridad",
      items: [
        { icon: CreditCard, label: "Saldo", section: "balance" },
        { icon: Bell, label: "Notificaciones", section: "notifications" },
        { icon: Lock, label: "Privacidad", section: "privacy" },
        { icon: Shield, label: "Seguridad", section: "security" },
      ]
    }
  ];

  return (
    <div className="w-72 max-w-[90vw]">
      {/* Header with User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="flex-shrink-0">
            <AvatarFallback className="bg-rose-600 text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{user?.username || 'Usuario'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2 max-h-[60vh] overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={section.title}>
            <div className="px-2 py-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {section.title}
              </p>
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.section}
                  onClick={() => router.push(`/profile?section=${item.section}`)}
                  className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
            {idx < menuSections.length - 1 && <Separator className="my-2" />}
          </div>
        ))}

        {/* Admin Panel */}
        {isAdmin && (
          <>
            <Separator className="my-2" />
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                Panel Admin
              </span>
            </button>
          </>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-2 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-2 py-3 hover:bg-red-50 dark:hover:bg-red-950 rounded-md transition-colors text-red-600 dark:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
