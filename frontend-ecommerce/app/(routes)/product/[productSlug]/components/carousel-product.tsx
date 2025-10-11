/* eslint-disable @next/next/no-img-element */
"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";
import { useState } from "react";

// Corrige la interfaz para que coincida con los datos reales
interface CarouselProductProps {
    images?: {
        data: Array<{
            id: number;
            attributes: {
                url: string
            }
        }>
    }
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;
    const [selectedImage, setSelectedImage] = useState(0);

    // Verifica si images y images.data existen antes de intentar mapearlos añadido despues
    if (!images || !images.data) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <p className="text-gray-400">No hay imágenes disponibles</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Imagen principal con efecto de zoom */}
            <div className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-xl">
                <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                        {images.data.map((image, index) => (
                            <CarouselItem key={image.id}>
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                        alt={`Imagen del producto ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay con gradiente en hover */}
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
                    {selectedImage + 1} / {images.data.length}
                </div>
            </div>

            {/* Miniaturas */}
            {images.data.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.data.map((image, index) => (
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
    )
}

export default CarouselProduct