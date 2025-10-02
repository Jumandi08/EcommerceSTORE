/* eslint-disable @next/next/no-img-element */
"use client"

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";


const FeaturedProducts = () => {
const router = useRouter()
const {addItem} = useCart ()

  const {loading, result, error} = useGetFeaturedProducts();

  return ( 
    <div className="max-w-6xl py-4 px-4 mx-auto sm:py-8 sm:px-8 md:py-16 md:px-24">
      <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 sm:ml-0">
          {loading && (
            <SkeletonSchema grid={3} />
          )}

          { !loading && result && result.length > 0 && (
            result.map((product) =>{
              const {attributes, id} = product
              const {slug, images, productName, taste, origin} = attributes

              // Skip products without images
              if (!images?.data?.[0]?.attributes?.url) {
                return null
              }

              return(
                <CarouselItem key={id} className="basis-full sm:basis-1/2 lg:basis-1/3 group" >
                  <div className="p-1">
                    <Card className="py-4 border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-4 sm:px-6 py-2">
                      <img 
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`} 
                          alt={productName || 'Featured Product'}
                          className="object-cover w-full h-[180px] sm:h-[200px] rounded-lg"
                        />

                        <div className="absolute w-full px-4 sm:px-7 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">

                            <div className="flex justify-center gap-x-4 sm:gap-x-6">
                                <IconButton  onClick={()=> router.push( `product/${slug}`)}
                                 icon={<Expand size={20} />} 
                                 className="text-gray-600 bg-white/90 hover:bg-white"
                                 />

                                <IconButton 
                                onClick={() => addItem(product)}
                                icon={<ShoppingCart size={18} className="sm:w-5 sm:h-5" />}
                                className="text-gray-600 bg-white/90 hover:bg-white"
                                />

                            </div>

                        </div>
                      </CardContent>
                        <div className="flex justify-between gap-8">
                          <h3 className="text-lg font-bold" >{productName}</h3>
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm sm:text-base px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{taste}</p>
                            <p className="text-sm sm:text-base px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">{origin}</p>
                          </div>
                        </div>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })
          )}

          {!loading && (!result || result.length === 0) && (
            <div className="w-full text-center py-8">
              <p className="text-gray-500">No hay productos destacados disponibles</p>
            </div>
          )}

          {error && (
            <div className="w-full text-center py-8">
              <p className="text-red-500">Error al cargar productos: {error}</p>
            </div>
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}

export default FeaturedProducts;
