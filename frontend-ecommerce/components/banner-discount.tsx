import Link from 'next/link';
import React from 'react'
import { buttonVariants } from './ui/button';

const BannerDiscount = () => {
  return (
    <div className='p-5 sm:p-20 text-center'>
        <h2 className='uppercase font-black text-2xl text-primary'>Consigue hasta un -25%</h2>
        <h3 className='mt-3 font-bold'>20 por porciento por gastar mas de 100€ 0 30€ de descuento al pagar con tarjeta</h3>
        
    <div className='max-w-md mx-auto sm:flex justify-center gap-5 mt-5'>
        <Link href="#" className={buttonVariants()}>Comprar </Link>
        <Link href="#" className={buttonVariants({variant: 'outline'})}>Mas info</Link>
    
    </div> 
        
    </div>
  )
}

export default BannerDiscount;