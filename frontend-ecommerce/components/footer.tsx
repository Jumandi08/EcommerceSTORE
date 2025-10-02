"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, Youtube, Facebook, Twitter, Instagram, Send } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const quickLinks = [
    { name: "Sobre nosotros", href: "#" },
    { name: "Contáctanos", href: "#" },
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Preguntas Frecuentes", href: "#" },
  ];

  const categories = [
    { name: "Recondicionados", href: "/category/recondicionado" },
    { name: "Open Box", href: "/category/open-box" },
    { name: "iPhone Nuevo", href: "/category/iphone-nuevo" },
    { name: "Accesorios", href: "#" },
    { name: "Productos Destacados", href: "#" },
  ];

  const socialLinks = [
    { Icon: Youtube, href: "#", label: "YouTube" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="w-full border-t mt-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Top Section - Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 py-8 border-b border-gray-200 dark:border-gray-800">
          {/* Visit Us */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-start gap-3 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Visítanos</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ecuador, Quito</p>
            </div>
          </motion.div>

          {/* Call Us */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-start gap-3 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
              <Phone className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Llámanos</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">+593 99 999 9999</p>
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-start gap-3 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Horario</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lun - Sáb: 09:00 - 19:00</p>
            </div>
          </motion.div>

          {/* Email Us */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-start gap-3 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
              <Mail className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Escríbenos</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">info@mobileshop.com</p>
            </div>
          </motion.div>
        </div>

        {/* Middle Section - Links & Newsletter */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8 py-10">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Mobile<span className="text-rose-600">Shop</span>
              </h2>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Tu tienda de confianza para smartphones recondicionados y accesorios de calidad.
              Ofrecemos productos certificados con garantía.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categorías</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Suscríbete para recibir actualizaciones y ofertas exclusivas.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pr-10 border-2 focus:border-rose-600 dark:bg-gray-800 dark:border-gray-700"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white group"
              >
                <span>Suscribirse</span>
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Mobile<span className="text-rose-600">Shop</span>
              </span>
              . Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="#" className="hover:text-rose-600 transition-colors">
                Política de Cookies
              </Link>
              <Link href="#" className="hover:text-rose-600 transition-colors">
                Mapa del Sitio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
