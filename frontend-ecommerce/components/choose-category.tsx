/* eslint-disable @next/next/no-img-element */
"use client"

import { useGetCategories } from '@/api/getProducts';
import Link from 'next/link';

const ChooseCategory = () => {
  const {result, loading, error} = useGetCategories()

  return (
    <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
      <h3 className='px-6 pb-4 text-3xl sm:pb-8'>Elige tu categoria favorita</h3>
      <div className='grid gap-5 sm:grid-cols-3'>

        {loading && (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">Cargando categorías...</p>
          </div>
        )}

        {!loading && result && result.length > 0 && result.map((category) => {
          if (!category.mainImage?.url) {
            return null;
          }

          const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className='relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg'>
              <img
                src={imageUrl}
                alt={category.categoryName || 'Category Image'}
                className='max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110'
              />
              <p className='absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg'>
                {category.categoryName}
              </p>
            </Link>
          );
        })}

        {!loading && (!result || result.length === 0) && (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">No hay categorías disponibles</p>
          </div>
        )}

        {error && (
          <div className="col-span-3 text-center py-8">
            <p className="text-red-500">Error al cargar categorías: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChooseCategory;
