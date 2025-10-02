"use client"
import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
// import {ProductType} from "@/types/product";



export default function Page() {
  const params = useParams();
  const productSlug = params.productSlug as string;

  // Asegúrate de que useGetProductBySlug sea un hook válido
  const response = useGetProductBySlug(productSlug);
  
  // Verifica si response existe antes de intentar desestructurarlo
  if (!response) {
    return <p>Cargando ...</p>;
  }
  
   const { result } = response as ResponseType; // el original 

 

  if (result === null) {
    return <SkeletonProduct/>
  }

  if (!result || result.length === 0 || !result[0]?.attributes) {
    return <p className="text-center py-8">Producto no encontrado</p>
  }

  return (
    <div className=" max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          <CarouselProduct images={result[0].attributes.images}  />

        </div>

        <div className="sm:px-12">
              <InfoProduct product={result[0]} />
        </div>

      </div>

    </div>
  );
}