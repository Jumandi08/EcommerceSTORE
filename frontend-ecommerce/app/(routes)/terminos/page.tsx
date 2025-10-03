"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertCircle, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Terminos() {
  const sections = [
    {
      icon: Scale,
      title: "1. Aceptación de los Términos",
      content: "Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShieldCheck,
      title: "2. Uso de la Licencia",
      content: "Se otorga permiso para descargar temporalmente una copia de los materiales en el sitio web de MobileShop solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede: modificar o copiar los materiales; utilizar los materiales para cualquier propósito comercial o para exhibición pública; intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "3. Descargo de Responsabilidad",
      content: "Los materiales en el sitio web de MobileShop se proporcionan 'tal cual'. MobileShop no ofrece garantías, expresas o implícitas, y por este medio renuncia y niega todas las demás garantías, incluyendo sin limitación, garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular, o no infracción de propiedad intelectual u otra violación de derechos.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: AlertCircle,
      title: "4. Limitaciones",
      content: "En ningún caso MobileShop o sus proveedores serán responsables de cualquier daño (incluyendo, sin limitación, daños por pérdida de datos o beneficio, o debido a la interrupción del negocio) que surja del uso o la incapacidad de utilizar los materiales en el sitio web de MobileShop, incluso si MobileShop o un representante autorizado ha sido notificado oralmente o por escrito de la posibilidad de tal daño.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: CheckCircle2,
      title: "5. Precisión de los Materiales",
      content: "Los materiales que aparecen en el sitio web de MobileShop podrían incluir errores técnicos, tipográficos o fotográficos. MobileShop no garantiza que cualquiera de los materiales en su sitio web sean precisos, completos o actuales. MobileShop puede realizar cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const additionalTerms = [
    {
      title: "Modificaciones",
      description: "MobileShop puede revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos."
    },
    {
      title: "Ley Aplicable",
      description: "Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Ecuador y usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales en ese estado o ubicación."
    },
    {
      title: "Enlaces a Terceros",
      description: "MobileShop no ha revisado todos los sitios vinculados a su sitio web y no es responsable del contenido de ningún sitio vinculado. La inclusión de cualquier enlace no implica respaldo por parte de MobileShop del sitio."
    },
    {
      title: "Privacidad",
      description: "Su uso de nuestro sitio web también está sujeto a nuestra Política de Privacidad. Por favor, revise nuestra Política de Privacidad, que también rige el Sitio e informa a los usuarios de nuestras prácticas de recopilación de datos."
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/5" />
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-4 flex items-center justify-center gap-2">
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/50">
                <FileText className="w-3 h-3 mr-1" />
                Legal
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6"
            >
              Términos y Condiciones
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Bienvenido a MobileShop</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Por favor, lea atentamente estos términos y condiciones antes de utilizar nuestros servicios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de MobileShop.
                  Al acceder a este sitio web, asumimos que acepta estos términos y condiciones. No continúe usando MobileShop
                  si no está de acuerdo con todos los términos y condiciones establecidos en esta página.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Terms Sections */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <motion.div key={section.title} variants={fadeInUp}>
                <Card className="group border-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.color}`} />

                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} p-0.5`}>
                          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                            <section.icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-xl md:text-2xl mb-2">{section.title}</CardTitle>
                        <Separator className="bg-primary/20" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Términos Adicionales</h2>
            <p className="text-muted-foreground text-lg">
              Información complementaria importante sobre nuestros términos de servicio.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {additionalTerms.map((term, index) => (
              <motion.div key={term.title} variants={fadeInUp}>
                <Card className="h-full border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      {term.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {term.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">¿Tienes preguntas?</h3>
                <p className="text-muted-foreground mb-6">
                  Si tienes alguna duda sobre nuestros términos y condiciones, no dudes en contactarnos.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Badge variant="outline" className="px-4 py-2">
                    <FileText className="w-4 h-4 mr-2" />
                    info@mobileshop.com
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Scale className="w-4 h-4 mr-2" />
                    Departamento Legal
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
