"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Package, CreditCard, Truck, RefreshCw, Shield, Search, MessageCircle, Sparkles, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      icon: Package,
      title: "Pedidos y Compras",
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "¿Cómo puedo realizar un pedido?",
          answer: "Para realizar un pedido, simplemente navega por nuestro catálogo, selecciona los productos que desees, agrégalos al carrito y procede al checkout. Deberás crear una cuenta o iniciar sesión, proporcionar la dirección de envío y seleccionar el método de pago. Una vez confirmado, recibirás un email con los detalles de tu pedido."
        },
        {
          question: "¿Puedo modificar o cancelar mi pedido?",
          answer: "Sí, puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de haberlo realizado. Para hacerlo, ve a 'Mis Pedidos' en tu perfil y selecciona la opción de modificar o cancelar. Después de este período, el pedido entrará en proceso de preparación y no podrá ser modificado."
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, y pagos en efectivo contra entrega (disponible solo en ciertas zonas). Todos los pagos son procesados de forma segura a través de nuestra pasarela de pago certificada."
        },
        {
          question: "¿Emiten factura?",
          answer: "Sí, emitimos factura electrónica para todas las compras. La factura se enviará automáticamente a tu correo electrónico una vez que el pedido sea procesado. Si necesitas factura a nombre de una empresa, asegúrate de proporcionar los datos fiscales durante el proceso de compra."
        }
      ]
    },
    {
      icon: Truck,
      title: "Envíos y Entregas",
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "¿Cuánto tiempo tarda la entrega?",
          answer: "El tiempo de entrega depende de tu ubicación. Para Quito, generalmente entregamos en 1-2 días hábiles. Para otras ciudades principales de Ecuador, el tiempo es de 3-5 días hábiles. Para zonas rurales puede tomar hasta 7 días hábiles. Recibirás un código de seguimiento para rastrear tu pedido."
        },
        {
          question: "¿Cuál es el costo de envío?",
          answer: "El costo de envío varía según el destino y el peso del paquete. Para pedidos superiores a $50, el envío es gratis dentro de Quito. Para otras ciudades, el costo se calcula automáticamente durante el checkout. Puedes ver el costo exacto antes de confirmar tu compra."
        },
        {
          question: "¿Hacen entregas internacionales?",
          answer: "Actualmente solo realizamos entregas dentro de Ecuador. Estamos trabajando para expandir nuestros servicios a nivel internacional en un futuro próximo. Suscríbete a nuestro newsletter para recibir actualizaciones sobre este servicio."
        },
        {
          question: "¿Puedo recoger mi pedido en tienda?",
          answer: "Sí, ofrecemos la opción de 'Retiro en Tienda' sin costo adicional. Selecciona esta opción durante el checkout y recibirás una notificación cuando tu pedido esté listo para recoger. Debes presentar tu cédula y el código de pedido al momento de retirarlo."
        }
      ]
    },
    {
      icon: RefreshCw,
      title: "Devoluciones y Garantías",
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          question: "¿Cuál es la política de devolución?",
          answer: "Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su empaque original, sin uso y con todos sus accesorios. Para iniciar una devolución, contacta a nuestro servicio al cliente con tu número de pedido. El reembolso se procesará en 5-7 días hábiles después de recibir el producto."
        },
        {
          question: "¿Qué garantía tienen los productos?",
          answer: "Todos nuestros productos cuentan con garantía del fabricante. Los smartphones tienen 12 meses de garantía, los accesorios 6 meses. Los productos recondicionados tienen 6 meses de garantía. La garantía cubre defectos de fabricación, pero no cubre daños por mal uso, caídas o contacto con líquidos."
        },
        {
          question: "¿Cómo hago válida la garantía?",
          answer: "Para hacer válida la garantía, contacta a nuestro servicio técnico con tu factura de compra y una descripción del problema. Evaluaremos el caso y, si aplica la garantía, te indicaremos los pasos a seguir. El proceso puede incluir reparación, reemplazo o reembolso según el caso."
        },
        {
          question: "¿Puedo cambiar un producto por otro?",
          answer: "Sí, aceptamos cambios por productos diferentes siempre que se hagan dentro de los primeros 15 días y el producto esté en perfectas condiciones. Si el nuevo producto tiene un precio mayor, deberás pagar la diferencia. Si es menor, te reembolsaremos la diferencia."
        }
      ]
    },
    {
      icon: Shield,
      title: "Productos y Calidad",
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "¿Qué significa 'recondicionado'?",
          answer: "Un producto recondicionado es aquel que ha sido devuelto, inspeccionado, reparado si es necesario, limpiado y probado para garantizar que funciona como nuevo. Todos nuestros productos recondicionados pasan por un riguroso proceso de control de calidad de 50 puntos antes de ser vendidos. Incluyen garantía y vienen en empaque sellado."
        },
        {
          question: "¿Los productos son originales?",
          answer: "Sí, todos nuestros productos son 100% originales y auténticos. No vendemos réplicas ni copias. Trabajamos directamente con distribuidores autorizados y cada producto viene con certificado de autenticidad. Puedes verificar el IMEI de cualquier smartphone en la página del fabricante."
        },
        {
          question: "¿Qué es 'Open Box'?",
          answer: "'Open Box' se refiere a productos que fueron abiertos pero nunca o muy poco usados. Pueden ser devoluciones de clientes que cambiaron de opinión, unidades de exhibición, o productos con empaque dañado pero el artículo está perfecto. Tienen un descuento significativo y cuentan con la misma garantía."
        },
        {
          question: "¿Verifican los productos antes de enviarlos?",
          answer: "Absolutamente. Cada producto es inspeccionado y probado antes de ser enviado. Verificamos el estado físico, funcionalidad completa, accesorios incluidos, y que el empaque esté en buenas condiciones. Si detectamos algún problema, el producto no se envía hasta que sea corregido."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Pagos y Seguridad",
      color: "from-pink-500 to-rose-500",
      faqs: [
        {
          question: "¿Es seguro pagar con tarjeta en este sitio?",
          answer: "Sí, es completamente seguro. Utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI-DSS. No almacenamos información de tarjetas en nuestros servidores; todos los datos son procesados directamente por nuestra pasarela de pago certificada. Además, contamos con sistemas de detección de fraude."
        },
        {
          question: "¿Puedo pagar en cuotas?",
          answer: "Sí, ofrecemos opciones de pago en cuotas con tarjetas de crédito de bancos seleccionados. Las opciones disponibles son 3, 6, 9 o 12 cuotas sin intereses para compras superiores a $100. Las condiciones específicas se muestran durante el checkout según tu banco emisor."
        },
        {
          question: "¿Qué hago si mi pago fue rechazado?",
          answer: "Si tu pago fue rechazado, primero verifica que los datos de tu tarjeta sean correctos y que tengas fondos suficientes. También confirma con tu banco que no hayan bloqueado la transacción por seguridad. Si el problema persiste, intenta con otro método de pago o contacta a tu banco. Nuestro equipo de soporte también puede ayudarte."
        },
        {
          question: "¿Cuándo se hace el cargo a mi tarjeta?",
          answer: "El cargo a tu tarjeta se realiza en el momento en que confirmas tu pedido. Sin embargo, la autorización puede aparecer como 'pendiente' hasta que el pedido sea enviado. Si cancelas el pedido antes del envío, la autorización se libera automáticamente en 3-5 días hábiles según tu banco."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
                <HelpCircle className="w-3 h-3 mr-1" />
                Centro de Ayuda
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6"
            >
              Preguntas Frecuentes
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros productos y servicios.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Busca tu pregunta aquí..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg border-2 border-primary/20 focus:border-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <motion.div key={category.title} variants={fadeInUp}>
                  <Card className="border-primary/20 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} p-0.5`}>
                            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                              <category.icon className="w-7 h-7 text-primary" />
                            </div>
                          </div>
                        </motion.div>
                        <div>
                          <CardTitle className="text-2xl md:text-3xl">{category.title}</CardTitle>
                          <CardDescription>
                            {category.faqs.length} pregunta{category.faqs.length !== 1 ? 's' : ''} en esta categoría
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                            <AccordionTrigger className="text-left hover:text-primary transition-colors">
                              <span className="font-semibold">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pt-2 pb-4 text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground">
                  Intenta con otros términos de búsqueda o explora todas las categorías.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 md:p-12">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ¿No encontraste lo que buscabas?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta o inquietud.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="group">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat en Vivo
                  </Button>
                  <Button size="lg" variant="outline" className="group">
                    <Phone className="w-5 h-5 mr-2" />
                    Llamar Soporte
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Badge variant="secondary">
                    Respuesta en 24h
                  </Badge>
                  <Badge variant="secondary">
                    Soporte en Español
                  </Badge>
                  <Badge variant="secondary">
                    Lun - Sáb: 09:00 - 19:00
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
