"use client"

import { motion } from "framer-motion"
import { Truck, Undo2, Headphones, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En compras mayores a $100",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Undo2,
    title: "Devoluciones Gratis",
    description: "30 días para devoluciones",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Atención al cliente siempre",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Calidad",
    description: "Productos 100% originales",
    gradient: "from-orange-500 to-red-500"
  }
]

export default function FeaturesModern() {
  return (
    <section className="mx-auto my-12 max-w-7xl px-4">
      <div className="grid gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 md:grid-cols-4">
        {features.map(({ icon: Icon, title, description, gradient }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-3"
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-md`}>
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
