"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const ItemsMenuMobile = () => {
  return (
    <Popover>
        <PopoverTrigger>
            <Menu/>
        </PopoverTrigger>
        <PopoverContent>
    
          <Link href="categories/Iphone" className="block"> Iphone</Link>
          <Link href="categories/Samsung"className="block"> Samsung</Link>
          <Link href="categories/Pixel"className="block"> Pixel</Link>
          <Link href="categories/Infinix"className="block"> Infinix</Link>
          <Link href="categories/Pantallas"className="block">Pantallas</Link>
          <Link href="categories/Baterias"className="block"> Baterias</Link>
          
        </PopoverContent>
    </Popover>
  )
}

export default ItemsMenuMobile