"use client"

import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star as StarIcon,
  Truck,
  Undo2,
  Headphones,
  ShieldCheck,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  RefreshCcw
} from "lucide-react";
import { useRouter } from "next/navigation";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// ------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------
const Stars = ({ count = 5 }) => (
  <div className="flex items-center gap-1 text-yellow-500">
    {Array.from({ length: count }).map((_, i) => (
      <StarIcon key={i} className="h-4 w-4 fill-yellow-500" />
    ))}
  </div>
);

const SectionTitle = ({ title, cta, className = "" }: { title: string; cta?: React.ReactNode; className?: string }) => (
  <div className={`mb-6 flex items-end justify-between ${className}`}>
    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
    {cta}
  </div>
);

// ------------------------------------------------------------
// Hero
// ------------------------------------------------------------
const Hero = () => {
  const router = useRouter();

  return (
    <section className="mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200 p-6 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="relative z-10">
          <Badge className="mb-4 bg-white text-zinc-900 hover:bg-white">OFERTAS ESPECIALES</Badge>
          <h1 className="text-4xl font-bold leading-tight text-zinc-900 md:text-5xl dark:text-white">
            Descubre la última tecnología a precios increíbles
          </h1>
          <p className="mt-3 text-zinc-700 dark:text-zinc-200">Obtén descuentos de hasta 25% en productos seleccionados</p>
          <div className="mt-6 flex items-center gap-3">
            <Button
              className="rounded-full bg-white text-zinc-900 hover:bg-white/90 dark:bg-zinc-900 dark:text-white"
              onClick={() => router.push('/category/all')}
            >
              Comprar Ahora →
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white/90 text-zinc-900 hover:bg-white dark:bg-zinc-900 dark:text-white">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-10 w-10 rounded-full bg-rose-600 hover:bg-rose-600/90">
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative h-[520px] w-[260px] rounded-[34px] border-[10px] border-zinc-800 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl md:h-[600px] md:w-[300px] dark:border-zinc-900">
            <div className="absolute inset-[10px] rounded-[26px] bg-black px-4 py-6 text-white">
              <div className="mb-2 text-center text-xs opacity-70">Lunes, 9 de Septiembre</div>
              <div className="text-center text-6xl font-light">9:41</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ------------------------------------------------------------
// Categorías
// ------------------------------------------------------------
const categories = [
  { title: "ACCESORIOS", price: "$90", icon: "📱" },
  { title: "ELECTRODOMÉSTICOS", price: "$140", icon: "🖥️" },
  { title: "CÁMARAS", price: "$110", icon: "📷" },
  { title: "SMARTPHONES", price: "$130", icon: "📱" },
];

const Categories = () => {
  const router = useRouter();

  return (
    <section className="mx-auto my-14 max-w-7xl px-4">
      <div className="grid gap-5 md:grid-cols-4">
        {categories.map((c) => (
          <Card
            key={c.title}
            className="cursor-pointer rounded-xl transition hover:-translate-y-1 hover:shadow-lg"
            onClick={() => router.push('/category/all')}
          >
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-2xl dark:bg-zinc-800">
                {c.icon}
              </div>
              <div className="text-xs font-semibold tracking-widest text-zinc-900 dark:text-zinc-100">
                {c.title}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Desde <span className="font-semibold text-rose-600">{c.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// ------------------------------------------------------------
// Features
// ------------------------------------------------------------
const features = [
  { icon: Truck, title: "Envío Gratis", desc: "En compras superiores a $100" },
  { icon: Undo2, title: "Devoluciones Gratis", desc: "30 días para devoluciones" },
  { icon: Headphones, title: "Soporte 24/7", desc: "Atención al cliente siempre" },
  { icon: ShieldCheck, title: "Garantía de Calidad", desc: "Verificado por nuestro equipo" },
];

const Features = () => (
  <section className="mx-auto my-14 max-w-7xl px-4">
    <div className="grid gap-7 rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900 md:grid-cols-4">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-start gap-3">
          <Icon className="mt-0.5 h-6 w-6" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ------------------------------------------------------------
// Productos (datos de ejemplo - reemplazar con Strapi)
// ------------------------------------------------------------
const products = [
  {
    id: 1,
    category: "ACCESORIOS",
    name: "Laptop HP, AMD Ryzen 5 5500U",
    rating: 5,
    reviews: 5,
    stock: 18,
    price: 1659,
    original: 1907.85,
    hot: true,
    sale: false,
    bg: "linear-gradient(45deg, #667eea, #764ba2)",
  },
  {
    id: 2,
    category: "AUDIO",
    name: "Auriculares Inalámbricos Premium",
    rating: 5,
    reviews: 5,
    stock: 6,
    price: 550,
    original: 605,
    hot: true,
    sale: false,
    bg: "#ff4444",
    circle: true,
  },
  {
    id: 3,
    category: "SMARTPHONES",
    name: "Realme Note 60x (4/64GB)",
    rating: 5,
    reviews: 5,
    stock: 10,
    price: 698,
    original: 768.8,
    hot: false,
    sale: false,
    bg: "linear-gradient(135deg, #667eea, #a8edea)",
  },
  {
    id: 4,
    category: "SMARTPHONES",
    name: "Samsung Galaxy S25 Ultra 5G",
    rating: 5,
    reviews: 5,
    stock: 13,
    price: 1659,
    original: 1907.85,
    hot: false,
    sale: false,
    bg: "linear-gradient(135deg, #f093fb, #f5576c)",
  },
];

interface DemoProduct {
  name: string;
  price: number;
  category: string;
  rating: number;
  bg: string;
  hot?: boolean;
  sale?: boolean;
  circle?: boolean;
}

const ProductCard = ({ p }: { p: DemoProduct }) => {
  const router = useRouter();

  return (
    <Card className="relative rounded-xl transition hover:-translate-y-1 hover:shadow-xl">
      {p.hot && (
        <Badge className="absolute left-3 top-3 bg-rose-600">🔥 Hot</Badge>
      )}
      {p.sale && (
        <Badge variant="outline" className="absolute right-3 top-3 bg-white">¡Oferta!</Badge>
      )}

      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-center">
          <div
            style={{
              background: p.bg,
              height: 180,
              width: p.circle ? 180 : "100%",
              borderRadius: p.circle ? 999 : 12,
            }}
            className="mx-auto"
          />
        </div>
        <div className="text-[11px] uppercase tracking-wider text-zinc-500">{p.category}</div>
        <div className="mt-1 line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {p.name}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Stars count={p.rating} />
          <span className="text-xs text-zinc-600">{p.reviews} Reseñas</span>
        </div>
        <div className="mt-1 text-sm text-zinc-600">En Stock: {p.stock}</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-rose-600">${p.price.toLocaleString()}</span>
          <span className="text-sm text-zinc-500 line-through">
            ${p.original.toLocaleString()}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5">
        <Button
          className="w-full rounded-lg bg-rose-600 hover:bg-rose-600/90"
          onClick={() => router.push(`/product/${p.id}`)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductsSection = () => (
  <section id="shop" className="mx-auto my-14 max-w-7xl px-4">
    <Tabs defaultValue="gadget" className="w-full">
      <TabsList className="mx-auto mb-6 grid w-full max-w-xl grid-cols-5 rounded-full bg-white p-1 shadow-sm dark:bg-zinc-900">
        <TabsTrigger value="gadget" className="rounded-full">Gadgets</TabsTrigger>
        <TabsTrigger value="appliances" className="rounded-full">Aparatos</TabsTrigger>
        <TabsTrigger value="refrigerators" className="rounded-full">Refrigeradores</TabsTrigger>
        <TabsTrigger value="others" className="rounded-full">Otros</TabsTrigger>
        <TabsTrigger value="refresh" className="rounded-full"><RefreshCcw className="h-4 w-4" /></TabsTrigger>
      </TabsList>

      <TabsContent value="gadget">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="appliances">
        <div className="text-center text-sm text-zinc-500">Sin productos — demo.</div>
      </TabsContent>
      <TabsContent value="refrigerators">
        <div className="text-center text-sm text-zinc-500">Sin productos — demo.</div>
      </TabsContent>
      <TabsContent value="others">
        <div className="text-center text-sm text-zinc-500">Sin productos — demo.</div>
      </TabsContent>
      <TabsContent value="refresh">
        <div className="text-center text-sm text-zinc-500">¡Actualizado!</div>
      </TabsContent>
    </Tabs>
  </section>
);

// ------------------------------------------------------------
// Brands
// ------------------------------------------------------------
const brands = [
  { label: "Hi tech" },
  { label: "HP", className: "text-sky-500" },
  { label: "🍎" },
  { label: "A-TECH" },
  { label: "HITACHI", className: "text-rose-600" },
  { label: "HUAWEI", className: "text-rose-600" },
  { label: "IKEA", className: "text-blue-900" },
  { label: "SONY" },
];

const BrandsSection = () => (
  <section className="mx-auto my-14 max-w-7xl px-4">
    <SectionTitle
      title="Comprar por Marcas"
      cta={<a className="text-sm text-zinc-700 hover:underline dark:text-zinc-300" href="#">Ver todas</a>}
    />
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
      {brands.map((b, i) => (
        <div
          key={i}
          className="flex h-20 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span className={b.className}>{b.label}</span>
        </div>
      ))}
    </div>
  </section>
);

// ------------------------------------------------------------
// Blog
// ------------------------------------------------------------
const blogs = [
  {
    id: 1,
    category: "Lifestyle",
    date: "📅 19 de Febrero, 2025",
    title: "¿Agencia de renta de oficinas o directa? ¿Cuál es mejor al rentar...",
  },
  {
    id: 2,
    category: "Redes Sociales",
    date: "📅 19 de Febrero, 2025",
    title: "Top 7 estrategias para crecer la audiencia de tu marca tech este año",
  },
  {
    id: 3,
    category: "Gadgets",
    date: "📅 19 de Febrero, 2025",
    title: "Probamos los últimos auriculares con cancelación de ruido",
  },
];

const BlogSection = () => (
  <section id="blog" className="mx-auto my-14 max-w-7xl px-4">
    <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Último Blog</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((b) => (
        <Card key={b.id} className="group cursor-pointer overflow-hidden rounded-xl transition hover:-translate-y-1 hover:shadow-xl">
          <div className="h-44 w-full bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700" />
          <CardContent className="p-5">
            <div className="mb-2 flex items-center gap-4 text-xs">
              <span className="font-semibold text-rose-600">{b.category}</span>
              <span className="text-zinc-500">{b.date}</span>
            </div>
            <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {b.title}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

// ------------------------------------------------------------
// Footer
// ------------------------------------------------------------
const Footer = () => (
  <footer className="mt-20">
    <div className="border-t bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">Mobile<span className="text-rose-600">Shop</span></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Electrónicos y gadgets premium seleccionados por rendimiento y estilo.
          </p>
          <div className="mt-4 flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
            <a href="#" className="rounded-full border p-2 transition hover:bg-rose-600 hover:text-white dark:border-zinc-700">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full border p-2 transition hover:bg-rose-600 hover:text-white dark:border-zinc-700">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full border p-2 transition hover:bg-rose-600 hover:text-white dark:border-zinc-700">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Compañía</h3>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Nosotros</a></li>
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Carreras</a></li>
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Prensa</a></li>
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Afiliados</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Soporte</h3>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Centro de Ayuda</a></li>
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Envíos</a></li>
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Garantía</a></li>
            <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Devoluciones</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Newsletter</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Recibe actualizaciones y ofertas.</p>
          <div className="mt-3 flex gap-2">
            <Input type="email" placeholder="tu@email.com" className="bg-white dark:bg-zinc-900" />
            <Button>Suscribir</Button>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t bg-white py-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-600 md:flex-row dark:text-zinc-300">
        <p>© {new Date().getFullYear()} <strong className="text-zinc-900 dark:text-white">MobileShop</strong>. Todos los derechos reservados.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> soporte@mobileshop.com</div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 000 000 000</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 100 Main Street, NY</div>
        </div>
      </div>
    </div>
  </footer>
);

// ------------------------------------------------------------
// Chat Widget
// ------------------------------------------------------------
const ChatWidget = () => (
  <Button
    size="icon"
    className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-zinc-900 shadow-xl hover:bg-rose-600 dark:bg-white dark:text-zinc-900"
  >
    <MessageCircle className="h-6 w-6 text-white dark:text-zinc-900" />
  </Button>
);

// ------------------------------------------------------------
// Página principal
// ------------------------------------------------------------
export default function DemoPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <div className="px-4">
        <Hero />
      </div>
      <Categories />
      <Features />
      <ProductsSection />
      <BrandsSection />
      <BlogSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
