/* eslint-disable @next/next/no-img-element */
"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";
import { useState } from "react";
import { Scene3D } from "@/components/3d-models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Box } from "lucide-react";

interface ProductMediaProps {
    images?: {
        data: Array<{
            id: number;
            attributes: {
                url: string
            }
        }>
    }
    model3dType?: string
    model3dUrl?: string
    model3dColor?: string
    model3dScale?: number
    model3dAnimate?: boolean
}

const ProductMedia = (props: ProductMediaProps) => {
    const {
        images,
        model3dType = "none",
        model3dUrl = "",
        model3dColor = "#1a1a1a",
        model3dScale = 1,
        model3dAnimate = true
    } = props;
    const [selectedImage, setSelectedImage] = useState(0);

    // Verificar si hay imágenes disponibles
    const hasImages = images && images.data && images.data.length > 0;
    // Verificar si hay modelo 3D configurado
    const has3DModel = model3dType && model3dType !== "none";

    // Si no hay imágenes ni modelo 3D
    if (!hasImages && !has3DModel) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <p className="text-gray-400">No hay contenido multimedia disponible</p>
            </div>
        );
    }

    // Si solo hay imágenes (sin modelo 3D), mostrar el carrusel tradicional
    if (hasImages && !has3DModel) {
        return (
            <div className="space-y-4">
                {/* Imagen principal */}
                <div className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-xl">
                    <Carousel className="w-full" opts={{ loop: true }}>
                        <CarouselContent>
                            {images!.data.map((image, index) => (
                                <CarouselItem key={image.id}>
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                            alt={`Imagen del producto ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 shadow-lg" />
                        <CarouselNext className="right-4 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 shadow-lg" />
                    </Carousel>

                    {/* Indicador de cantidad */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        {selectedImage + 1} / {images!.data.length}
                    </div>
                </div>

                {/* Miniaturas */}
                {images!.data.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                        {images!.data.map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                                    selectedImage === index
                                        ? 'ring-4 ring-rose-500 scale-105'
                                        : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-gray-400 dark:hover:ring-gray-500'
                                }`}
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                    alt={`Miniatura ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Si hay modelo 3D y posiblemente imágenes, mostrar tabs
    return (
        <div className="space-y-4">
            <Tabs defaultValue={has3DModel ? "3d" : "photos"} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    {has3DModel && (
                        <TabsTrigger value="3d" className="flex items-center gap-2">
                            <Box className="w-4 h-4" />
                            Vista 3D
                        </TabsTrigger>
                    )}
                    {hasImages && (
                        <TabsTrigger value="photos" className="flex items-center gap-2">
                            <Image className="w-4 h-4" />
                            Fotos ({images!.data.length})
                        </TabsTrigger>
                    )}
                </TabsList>

                {/* Vista 3D */}
                {has3DModel && (
                    <TabsContent value="3d" className="mt-0">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                            <Scene3D
                                model3dUrl={model3dUrl}
                                model3dScale={model3dScale}
                                model3dAnimate={model3dAnimate}
                                className="w-full h-[500px]"
                            />

                            {/* Badge informativo */}
                            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-sm flex items-center gap-2">
                                <Box className="w-3 h-3" />
                                Interactivo - Arrastra para rotar
                            </div>
                        </div>
                    </TabsContent>
                )}

                {/* Vista de fotos */}
                {hasImages && (
                    <TabsContent value="photos" className="mt-0">
                        <div className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-xl">
                            <Carousel className="w-full" opts={{ loop: true }}>
                                <CarouselContent>
                                    {images!.data.map((image, index) => (
                                        <CarouselItem key={image.id}>
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                                    alt={`Imagen del producto ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 shadow-lg" />
                                <CarouselNext className="right-4 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 shadow-lg" />
                            </Carousel>

                            {/* Indicador de cantidad */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                                {selectedImage + 1} / {images!.data.length}
                            </div>
                        </div>

                        {/* Miniaturas */}
                        {images!.data.length > 1 && (
                            <div className="grid grid-cols-4 gap-3 mt-4">
                                {images!.data.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                                            selectedImage === index
                                                ? 'ring-4 ring-rose-500 scale-105'
                                                : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-gray-400 dark:hover:ring-gray-500'
                                        }`}
                                    >
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                            alt={`Miniatura ${index + 1}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}

export default ProductMedia
