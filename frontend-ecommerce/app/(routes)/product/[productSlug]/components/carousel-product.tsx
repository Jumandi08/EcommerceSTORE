/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";

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

    // Verifica si images y images.data existen antes de intentar mapearlos añadido despues
    if (!images || !images.data) {
        return <div>No hay imágenes disponiblesF</div>;
    }

    return ( 
        <div className="sm-px-16"> 
            <Carousel>
                <CarouselContent>
                    {images.data.map((image) => (
                        <CarouselItem key={image.id}>
                            <img 
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                alt="Image product"
                                className="rounded-lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CarouselProduct