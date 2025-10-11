import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import { toast } from "./use-toast"
import {ProductType} from "@/types/product"


interface CartItem extends ProductType {
    quantity: number;
    selected?: boolean;
}

interface CartStore {
    items: CartItem [],
    addItem: (data: ProductType, quantity?: number) => void
    removeItem: (id: number) => void
    removeAll: () => void
    updateQuantity: (id: number, quantity: number) => void
    incrementQuantity: (id: number) => void
    decrementQuantity: (id: number) => void
    toggleSelectItem: (id: number) => void
    selectAllItems: () => void
    deselectAllItems: () => void
    getSelectedItems: () => CartItem[]
    removeSelectedItems: () => void
}

// Migration function to clean old format data
const migrateCartStorage = () => {
    try {
        const stored = localStorage.getItem('cart-storage');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.state?.items?.length > 0) {
                const firstItem = parsed.state.items[0];
                // Check if it's old format (no attributes)
                if (firstItem && !firstItem.attributes && firstItem.productName) {
                    localStorage.removeItem('cart-storage');
                }
            }
        }
    } catch (error) {
        // Silent error handling
    }
};

// Run migration on initialization
if (typeof window !== 'undefined') {
    migrateCartStorage();
}

export const useCart = create(persist<CartStore>((set, get)=>({
    items:[],
    addItem: (data: ProductType, quantity: number = 1) => {
        const currentItems = get().items

        // Validate that the product has the correct structure
        if (!data?.attributes) {
            return toast({
                title: "Error al añadir producto al carrito",
                variant: "destructive"
            });
        }

        // Check stock availability
        if (data.attributes.stock < quantity) {
            return toast({
                title: "Stock insuficiente",
                description: `Solo hay ${data.attributes.stock} unidades disponibles`,
                variant: "destructive"
            });
        }

        const existingItem = currentItems.find((item)=> item.id === data.id)

        if (existingItem){
            // Check if adding more would exceed stock
            const newQuantity = existingItem.quantity + quantity;
            if (data.attributes.stock < newQuantity) {
                return toast({
                    title: "Stock insuficiente",
                    description: `Solo hay ${data.attributes.stock} unidades disponibles`,
                    variant: "destructive"
                });
            }

            // Update quantity of existing item
            set({
                items: currentItems.map(item =>
                    item.id === data.id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            });
            return toast({
                title: "Cantidad actualizada en el carrito"
            });
        }


        set({
            items: [...get().items, { ...data, quantity }]

        })
        toast({
            title: "Producto añadido al carrito"
        })

    },
    removeItem: (id:number) => {
        set({items: [...get().items.filter((item) => item.id !== id) ]})
        toast({
            title: "Producto eliminado del carrito"
        })
    },

    removeAll: () => set({ items: []}),

    updateQuantity: (id: number, quantity: number) => {
        const currentItems = get().items;
        const item = currentItems.find(item => item.id === id);

        if (!item) return;

        if (quantity < 1) {
            return get().removeItem(id);
        }

        if (item.attributes.stock < quantity) {
            return toast({
                title: "Stock insuficiente",
                description: `Solo hay ${item.attributes.stock} unidades disponibles`,
                variant: "destructive"
            });
        }

        set({
            items: currentItems.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity } : cartItem
            )
        });
    },

    incrementQuantity: (id: number) => {
        const currentItems = get().items;
        const item = currentItems.find(item => item.id === id);
        if (item) {
            get().updateQuantity(id, item.quantity + 1);
        }
    },

    decrementQuantity: (id: number) => {
        const currentItems = get().items;
        const item = currentItems.find(item => item.id === id);
        if (item) {
            get().updateQuantity(id, item.quantity - 1);
        }
    },

    toggleSelectItem: (id: number) => {
        set({
            items: get().items.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        });
    },

    selectAllItems: () => {
        set({
            items: get().items.map(item => ({ ...item, selected: true }))
        });
    },

    deselectAllItems: () => {
        set({
            items: get().items.map(item => ({ ...item, selected: false }))
        });
    },

    getSelectedItems: () => {
        return get().items.filter(item => item.selected);
    },

    removeSelectedItems: () => {
        const selectedIds = get().items.filter(item => item.selected).map(item => item.id);
        if (selectedIds.length > 0) {
            set({
                items: get().items.filter(item => !item.selected)
            });
            toast({
                title: `${selectedIds.length} producto(s) eliminado(s) del carrito`
            });
        }
    }


}),{
    name:"cart-storage",
    storage: createJSONStorage (() => localStorage)
}))