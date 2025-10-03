"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Target, Users, Shield, Sparkles, Rocket, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EditableText, AdminToolbar } from '@/components/editable-content';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from "@/hooks/use-toast";

// Variantes de animación
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

export default function SobreNosotros() {
  const { isAdmin: _isAdminAuth } = useAuth();
  const { toast } = useToast();

  // MODO TESTING ACTIVADO - Para producción, cambia a: const isAdmin = isAdminAuth;
  const isAdmin = true; // ← TESTING MODE ENABLED
  // const isAdmin = isAdminAuth;

  // Estado para el contenido editable
  const [content, setContent] = useState({
    hero: {
      title: "Innovatech Solutions",
      description: "Transformamos ideas en realidades digitales. Nuestra pasión por la innovación y la excelencia nos impulsa a crear soluciones tecnológicas que superan expectativas."
    },
    mission: {
      title: "Nuestra Misión",
      description: "Impulsar el crecimiento de nuestros clientes a través de soluciones tecnológicas innovadoras y personalizadas, mejorando su eficiencia y competitividad en el mercado."
    },
    vision: {
      title: "Nuestra Visión",
      description: "Ser líderes en el desarrollo de soluciones tecnológicas, reconocidos por nuestra capacidad de innovación, calidad y compromiso con el éxito de nuestros clientes."
    },
    history: {
      title: "Nuestra Historia",
      description: "Desde nuestros inicios en 2010, Innovatech Solutions ha evolucionado de una pequeña startup a una empresa líder en el sector tecnológico. A lo largo de los años, hemos trabajado con una amplia gama de clientes."
    },
    teamTitle: "Conoce a Nuestro Equipo",
    teamDescription: "Profesionales altamente cualificados y apasionados por la tecnología.",
    valuesTitle: "Principios que nos Guían",
    valuesDescription: "Los valores fundamentales detrás de cada proyecto y decisión."
  });

  // Función para guardar cambios
  const handleSaveContent = async (field: string, value: string) => {
    try {
      // Aquí puedes hacer la llamada al API para guardar en la base de datos
      const response = await fetch('/api/content/sobre-nosotros', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, value }),
      });

      if (!response.ok) throw new Error('Error al guardar');

      // Actualizar el estado local
      const keys = field.split('.');
      setContent(prev => {
        const newContent = { ...prev };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newContent;
      });

      toast({
        title: "Cambios guardados",
        description: "El contenido se actualizó correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar los cambios.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <AdminToolbar isAdmin={isAdmin} />
      {/* Hero Section con gradiente animado */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Fondo decorativo animado */}
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
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
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
                <Sparkles className="w-3 h-3 mr-1" />
                Sobre Nosotros
              </Badge>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <EditableText
                initialValue={content.hero.title}
                onSave={(value) => handleSaveContent('hero.title', value)}
                isAdmin={isAdmin}
                as="h1"
                className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <EditableText
                initialValue={content.hero.description}
                onSave={(value) => handleSaveContent('hero.description', value)}
                isAdmin={isAdmin}
                as="p"
                multiline
                className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Button size="lg" className="group">
                Conoce más
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Contáctanos
              </Button>
            </motion.div>

            {/* Estadísticas */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: "15+", label: "Años de Experiencia" },
                { value: "500+", label: "Proyectos Completados" },
                { value: "200+", label: "Clientes Satisfechos" },
                { value: "50+", label: "Profesionales" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Misión, Visión e Historia con Cards mejorados */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Rocket,
                contentKey: 'mission',
                gradient: "from-blue-500/10 to-cyan-500/10"
              },
              {
                icon: Target,
                contentKey: 'vision',
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              {
                icon: Award,
                contentKey: 'history',
                gradient: "from-orange-500/10 to-red-500/10"
              }
            ].map((item, index) => {
              const sectionContent = content[item.contentKey as keyof typeof content] as { title: string; description: string };
              return (
                <motion.div key={item.contentKey} variants={fadeInUp}>
                  <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <EditableText
                        initialValue={sectionContent.title}
                        onSave={(value) => handleSaveContent(`${item.contentKey}.title`, value)}
                        isAdmin={isAdmin}
                        as="h2"
                        className="text-2xl font-bold"
                      />
                    </CardHeader>
                    <CardContent>
                      <EditableText
                        initialValue={sectionContent.description}
                        onSave={(value) => handleSaveContent(`${item.contentKey}.description`, value)}
                        isAdmin={isAdmin}
                        as="p"
                        multiline
                        className="text-base leading-relaxed text-muted-foreground"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Equipo con efectos hover avanzados */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                Nuestro Equipo
              </Badge>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <EditableText
                initialValue={content.teamTitle}
                onSave={(value) => handleSaveContent('teamTitle', value)}
                isAdmin={isAdmin}
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <EditableText
                initialValue={content.teamDescription}
                onSave={(value) => handleSaveContent('teamDescription', value)}
                isAdmin={isAdmin}
                as="p"
                multiline
                className="mt-4 text-lg text-muted-foreground"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {[
              {
                name: "Sofía Rodríguez",
                role: "CEO",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_SMkWboHlMup0oyVCa4j84Xz47Oc_o54Nnqiiwf1k3Yj2rSQwWqImZJJC9UWyQS7TuiKusk2aLeqncTSHDoQDU-04VxBdfM0-NCrtKjkZlAaDAdiHO2zyzpfd-fG_YSKPXNz1bpfTopmF01SZz0MPIV7UV9U6UBpr_ClndLfzN-3nxPmKoimStJzjo-VpsLg5W_6NTDWFOVJcf0lkFNNqApY5yrCJWlm_rlHtwhnIE2vX-0cGGRrkE3rPUHO5VjHEVSv3HHRX_xFf"
              },
              {
                name: "Carlos López",
                role: "CTO",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRxHzL-edKjinRZVOQ1tQPU5ogQGbNJHQSTjoXjjMlgzISDRbc-0DnGHKtCqI0sV2Ytb5r20YokeOot_w-O1Q4MHuTd5ujzAbvpygWMWSRx6YtXnZqHMfRET7xHpA_JCVQhkAN2C4fmJII25Khj5UtAthZpPEDMDrrZCdyHiSsJ2zVi3KA8oNpoy6op1fqnFbqDba_GiuODzJVmM591d9AtasZ8KxbkhEyjPtKNU3UnE7fw6f6VHI6rJWdrtb28yo994f-Q6Bru74I"
              },
              {
                name: "Ana Martínez",
                role: "Directora de Marketing",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlat0xRmf0DYU-kBpNaQwfoUpfEeZdfBchU23RG4nhiKTrKLHvR-OQT8UtqHN5I_aXeIrxnwFLAXoYCp1UyXhCPCkvzxdi2SrE_hTZ0Yymii7bPzrLK9A7WVGggwOVYDvi2s5znFFfkLf7ylZEn-Mn60twbg7aEGc0U3gsGGAqhxN8mjUMhKK7bWHffwUZgELkGdxY6aM16kRo39AGydsRvtt8wYQmgo3kwFDub_ZMqxbj6O5RokpAu3LJ_Po-5IbzlV3ylCopX4v6"
              }
            ].map((member, index) => (
              <motion.div key={member.name} variants={scaleIn}>
                <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      {/* Círculo decorativo de fondo */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:scale-110 transition-transform duration-500" />
                      </div>

                      {/* Imagen del miembro */}
                      <motion.div
                        className="relative mx-auto w-32 h-32"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover border-4 border-background shadow-xl relative z-10"
                          src={member.image}
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <Badge variant="outline" className="font-medium">
                        {member.role}
                      </Badge>
                    </div>

                    {/* Efecto decorativo */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valores con animaciones y efectos modernos */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Fondo con patrón sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Nuestros Valores
              </Badge>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <EditableText
                initialValue={content.valuesTitle}
                onSave={(value) => handleSaveContent('valuesTitle', value)}
                isAdmin={isAdmin}
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <EditableText
                initialValue={content.valuesDescription}
                onSave={(value) => handleSaveContent('valuesDescription', value)}
                isAdmin={isAdmin}
                as="p"
                multiline
                className="mt-4 text-lg text-muted-foreground"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                icon: Puzzle,
                title: "Innovación",
                description: "Buscamos constantemente nuevas formas de mejorar y superar las expectativas.",
                color: "from-blue-500 to-cyan-500",
                delay: 0
              },
              {
                icon: Target,
                title: "Orientación al Cliente",
                description: "Nos enfocamos en entender y satisfacer las necesidades de nuestros clientes.",
                color: "from-purple-500 to-pink-500",
                delay: 0.1
              },
              {
                icon: Users,
                title: "Trabajo en Equipo",
                description: "Colaboramos estrechamente para lograr resultados excepcionales.",
                color: "from-orange-500 to-red-500",
                delay: 0.2
              },
              {
                icon: Shield,
                title: "Integridad",
                description: "Actuamos con honestidad y transparencia en todas nuestras acciones.",
                color: "from-green-500 to-emerald-500",
                delay: 0.3
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="group relative h-full border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 overflow-hidden">
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Línea decorativa superior */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                  <CardContent className="p-6 relative">
                    {/* Icono con efecto de gradiente */}
                    <motion.div
                      className="mb-4 relative"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-10 rounded-xl blur-xl group-hover:opacity-20 transition-opacity`} />
                      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} p-0.5`}>
                        <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                          <value.icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>

                    <Separator className="mb-3 bg-primary/20" />

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>

                    {/* Patrón decorativo de fondo */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                      <value.icon className="w-full h-full" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section final */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Transformemos juntos tus ideas en realidad digital
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="group">
                Solicitar Cotización
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Ver Proyectos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
