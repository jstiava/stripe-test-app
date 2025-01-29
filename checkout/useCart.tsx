import { StripeProduct } from "@/types";
import { useState } from "react";


export interface UseCart {
    cart: StripeProduct[] | null;
    isSidebarOpen: boolean;
    toggleSidebar: () => boolean;
    add: (item : StripeProduct) => boolean;
    remove: (id : string) => boolean;
    get: (id : string) => StripeProduct | null;
}

export default function useCart() {

    const [cart, setCart] = useState<StripeProduct[] | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const add = (item : StripeProduct) => {

        const existingItem = get(item.id);
        if (existingItem) {
            alert("Already in cart");
            return false;
        }

        setCart(prev => {
            if (!prev) {
                return [item]
            }
            return [...prev, item]
        })
        return true;
    }

    const remove = (id : string) => {

        setCart(prev => {
            if (!prev) {
                return [];
            }
            const newCart = prev.filter(p => p.id != id);
            return newCart;
        })
        return false;
    }

    const get = (id : string) => {

        if (!cart) {
            return null;
        }
        
        return cart.find(p => p.id === id) || null;
    }

    const toggleSidebar = () => {
        let newValue = false;
        setIsSidebarOpen(prev => {
            newValue = !prev;
            return newValue;
        });
        return newValue;
    }

    return { cart, add, remove, get, isSidebarOpen, toggleSidebar}
}