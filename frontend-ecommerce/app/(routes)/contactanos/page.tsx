"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export default function Contactanos() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Ecuador, Quito",
      description: "Zona Norte - Centro Comercial",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+593 99 999 9999",
      description: "Lun - Sáb: 09:00 - 19:00",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@mobileshop.com",
      description: "Respuesta en 24 horas",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lun - Sáb: 09:00 - 19:00",
      description: "Domingo: Cerrado",
      color: "from-green-500 to-emerald-500"
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
                <MessageSquare className="w-3 h-3 mr-1" />
                Contáctanos
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6"
            >
              Estamos Aquí para Ti
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              ¿Tienes alguna pregunta? No dudes en contactarnos. Nuestro equipo está listo para ayudarte.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div key={item.title} variants={scaleIn}>
                <Card className="group relative h-full border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />

                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="mb-4 inline-block"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${item.color} p-0.5`}>
                        <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                          <item.icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                    </motion.div>

                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-primary font-semibold mb-1">{item.content}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">Envíanos un Mensaje</CardTitle>
                  <CardDescription className="text-base">
                    Completa el formulario y te responderemos lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nombre Completo
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Teléfono (Opcional)
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+593 99 999 9999"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Mensaje
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="border-2 focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="ml-2">Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ¿Por qué elegirnos?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  En MobileShop nos dedicamos a ofrecer productos de calidad con el mejor servicio al cliente.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Respuesta Rápida",
                    description: "Te respondemos en menos de 24 horas"
                  },
                  {
                    title: "Soporte Personalizado",
                    description: "Atención dedicada para cada cliente"
                  },
                  {
                    title: "Garantía de Calidad",
                    description: "Todos nuestros productos están certificados"
                  },
                  {
                    title: "Asesoría Experta",
                    description: "Equipo técnico altamente capacitado"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">¿Necesitas ayuda inmediata?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Llámanos directamente y con gusto te atenderemos.
                      </p>
                      <Button variant="outline" size="sm" className="group">
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar Ahora
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visítanos en Nuestra Tienda
            </h2>
            <p className="text-muted-foreground mb-8">
              Ecuador, Quito - Zona Norte. Te esperamos de Lunes a Sábado.
            </p>
            <div className="aspect-video w-full rounded-xl overflow-hidden border-2 border-primary/20 bg-secondary/50 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Mapa interactivo próximamente</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
