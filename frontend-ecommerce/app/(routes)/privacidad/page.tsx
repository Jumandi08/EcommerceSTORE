"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Cookie, UserCheck, FileText, AlertTriangle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function Privacidad() {
  const privacySections = [
    {
      icon: Database,
      title: "Recopilación de Información",
      content: "Recopilamos información que usted nos proporciona directamente cuando crea una cuenta, realiza una compra, se suscribe a nuestro boletín, o se comunica con nosotros. Esta información puede incluir: nombre, dirección de correo electrónico, dirección postal, número de teléfono, información de pago, y cualquier otra información que elija proporcionarnos.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Uso de la Información",
      content: "Utilizamos la información recopilada para: procesar y completar sus transacciones, enviarle confirmaciones de pedidos y actualizaciones, responder a sus comentarios y preguntas, enviarle información técnica, actualizaciones de seguridad, y mensajes administrativos, comunicarle sobre productos, servicios, ofertas, promociones, y eventos, y personalizar y mejorar nuestros servicios.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lock,
      title: "Protección de Datos",
      content: "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción. Esto incluye el uso de encriptación SSL, firewalls, y servidores seguros. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: UserCheck,
      title: "Compartir Información",
      content: "No vendemos, comercializamos ni transferimos su información personal a terceros, excepto en los siguientes casos: con proveedores de servicios que nos ayudan a operar nuestro sitio web y negocio, cuando sea requerido por ley o para proteger nuestros derechos, con su consentimiento explícito, y en caso de fusión, adquisición o venta de activos.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Cookie,
      title: "Cookies y Tecnologías Similares",
      content: "Utilizamos cookies y tecnologías similares para recopilar información sobre su actividad de navegación y preferencias. Las cookies nos ayudan a: recordar sus preferencias, entender cómo utiliza nuestro sitio web, mejorar su experiencia de usuario, y mostrar contenido y publicidad relevantes. Puede controlar el uso de cookies en la configuración de su navegador.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FileText,
      title: "Sus Derechos",
      content: "Usted tiene derecho a: acceder a sus datos personales, rectificar datos inexactos, solicitar la eliminación de sus datos, oponerse al procesamiento de sus datos, solicitar la limitación del procesamiento, y la portabilidad de sus datos. Para ejercer estos derechos, contáctenos a través de la información proporcionada en esta política.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const dataCategories = [
    {
      category: "Información de Cuenta",
      items: ["Nombre completo", "Dirección de email", "Contraseña (encriptada)", "Número de teléfono"]
    },
    {
      category: "Información de Compra",
      items: ["Historial de pedidos", "Dirección de envío", "Dirección de facturación", "Información de pago (tokenizada)"]
    },
    {
      category: "Información Técnica",
      items: ["Dirección IP", "Tipo de navegador", "Sistema operativo", "Cookies y datos de sesión"]
    },
    {
      category: "Información de Comunicación",
      items: ["Preferencias de email", "Historial de soporte", "Feedback y reseñas", "Suscripción al newsletter"]
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
                <Shield className="w-3 h-3 mr-1" />
                Privacidad y Seguridad
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6"
            >
              Política de Privacidad
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Tu privacidad es importante para nosotros. Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  <CardTitle className="text-2xl">Compromiso con tu Privacidad</CardTitle>
                </div>
                <CardDescription className="text-base">
                  En MobileShop, respetamos y protegemos la privacidad de nuestros usuarios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información
                  personal cuando utiliza nuestro sitio web y servicios. Al utilizar nuestros servicios, usted acepta
                  las prácticas descritas en esta política.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    <Lock className="w-3 h-3 mr-1" />
                    Datos Encriptados
                  </Badge>
                  <Badge variant="secondary">
                    <Shield className="w-3 h-3 mr-1" />
                    Cumplimiento GDPR
                  </Badge>
                  <Badge variant="secondary">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Control Total
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Privacy Sections */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {privacySections.map((section, index) => (
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

      {/* Data Categories */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Categorías de Datos que Recopilamos</h2>
            <p className="text-muted-foreground text-lg">
              Transparencia total sobre los datos que procesamos.
            </p>
          </motion.div>

          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {dataCategories.map((cat, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
            {dataCategories.map((cat, index) => (
              <TabsContent key={index} value={index.toString()}>
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      {cat.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {cat.items.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Actualizaciones de la Política</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios
                      significativos publicando la nueva política en esta página y actualizando la fecha de
                      &quot;última actualización&quot;. Le recomendamos revisar esta política periódicamente.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-amber-500/50">
                        Actualizaciones Automáticas
                      </Badge>
                      <Badge variant="outline" className="border-amber-500/50">
                        Notificación por Email
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">¿Preguntas sobre tu Privacidad?</h3>
                <p className="text-muted-foreground mb-6">
                  Si tienes alguna pregunta o inquietud sobre nuestra Política de Privacidad, contáctanos.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Badge variant="outline" className="px-4 py-2">
                    <FileText className="w-4 h-4 mr-2" />
                    privacy@mobileshop.com
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Oficial de Privacidad
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
