import {create} from "zustand"
import {persist, createJSONStorage} from 'zustand/middleware'
import {ProductType} from "@/types/product";
import { toast } from "./use-toast"

interface UseLovedProductsType {
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void
    removeLovedItem: (id: number) => void

}

// Migration function to clean old format data
const migrateLoveStorage = () => {
    try {
        const stored = localStorage.getItem('love-products-storage');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.state?.lovedItems?.length > 0) {
                const firstItem = parsed.state.lovedItems[0];
                // Check if it's old format (no attributes)
                if (firstItem && !firstItem.attributes && firstItem.productName) {
                    localStorage.removeItem('love-products-storage');
                }
            }
        }
    } catch (error) {
        // Silent error handling
    }
};

// Run migration on initialization
if (typeof window !== 'undefined') {
    migrateLoveStorage();
}

export const UseLovedProducts = create(persist<UseLovedProductsType>((set,get) => ({
    lovedItems: [],
    addLoveItem: (data: ProductType) => {
        const currentLovedItems = get ().lovedItems;

        // Validate that the product has the correct structure
        if (!data?.attributes) {
            return toast({
                title: "Error al añadir producto",
                variant: "destructive"
            });
        }

        const existingItem = currentLovedItems.find((item) =>item.id === data.id )

        if (existingItem){
            return toast({
                title: "El producto ya existe en la lista ",
                variant: "destructive"
            })
        }

        set({
            lovedItems: [... get().lovedItems, data]
        })
        toast ({
            title: "producto añadido a la lista"
        })
    },
    removeLovedItem: (id: number) => {
        set ({lovedItems: [...get().lovedItems.filter((item) => item.id !== id)]})
        toast({
            title: "Producto se ha eliminado de la lista"
        })
    }
}),{
    name: "love-products-storage",
    storage: createJSONStorage(() => localStorage)
} ))