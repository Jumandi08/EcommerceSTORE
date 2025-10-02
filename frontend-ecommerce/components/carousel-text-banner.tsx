"use client"

import { useRouter} from "next/navigation"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent} from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export const dataCarouselTop = [
    {
        id:1,
        tittle: "Envio en 24/48 Horas",
        description: "Como cliente Vip, tus envis en 24 horas. Obten mas info",
        link: "#"
    },
    {
        id:2,
        tittle: "Consigue hasta un -10% en compras superiores a 40 dolares ",
        description: "-20% al gastar 100 $ o 25% al gastar 150 $. Usa el codigo de descuento",
        link: "#"
    },
    {
        id:3,
        tittle: "Entregas gratuitas",
        description: "Como cliente tienes envios y devoluciones gratis en un plazo de 24 horas. Aplican condiciones",
        link: "#"
    },
    {
        id:4,
        tittle: "Comprar Novedades",
        description: "Todas  las novedades al 30% de descuento",
        link: "#"
    },
]

const CarouselTextBanner = () => {
    const router = useRouter();
    const plugin = useRef(
        Autoplay({ delay: 3500 })
    );
    
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel 
                className="w-full max-w-4xl mx-auto"
                plugins={[plugin.current]}
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({id, tittle, link, description}) => ( 
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                        <p className="sm:text-lg text-wrap dark:text-secondary">{tittle}</p>
                                        <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextBanner;