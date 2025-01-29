import { UseCart } from "./checkout/useCart";


export interface StripeAppProps {
    Cart: UseCart
}
export interface StripeProduct {
    id: string,
    name: string,
    metadata: any,
    default_price: string,
    description: string,
    images: string[],
}