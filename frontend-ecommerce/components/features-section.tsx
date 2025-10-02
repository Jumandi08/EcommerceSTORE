"use client"

import { Truck, Undo2, Headphones, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En compras superiores a $100",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Undo2,
    title: "Devoluciones Gratis",
    description: "30 días para devoluciones",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Atención al cliente siempre",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Calidad",
    description: "Productos 100% originales",
    color: "from-orange-500 to-red-500"
  }
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto my-16 max-w-7xl px-4">
      <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description, color }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex items-start gap-4"
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg transition-transform group-hover:scale-110`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
