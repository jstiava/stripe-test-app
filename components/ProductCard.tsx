import { StripePrice, StripeProduct } from "@/types"
import { Button, ButtonBase, Typography, useTheme } from "@mui/material"
import CoverImageCarousel from "./CoverImageCarousel";
import { CSSProperties, useEffect, useState } from "react";
import PriceSelector from "./PriceSelector";
import { UseCart } from "@/checkout/useCart";
import { Preview } from "@mui/icons-material";
import { Router, useRouter } from "next/router";

export const formatPrice = (price: number | null, currency: string): string => {
    try {
        if (!price || !currency) {
            return ""
        }

        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency,
        }).format(price / 100);

    }
    catch (err) {
        return "";
    }
}


export function DisplayPrice({
    product,
    style = {}
}: {
    product: StripeProduct,
    style?: CSSProperties
}) {

    const theme = useTheme();

    if (!product.selectedPrice) {
        return (
            <Typography sx={{
                fontSize: "1.25rem",
                color: theme.palette.primary.light,
                width: "fit-content",
                maxWidth: "5rem",
                textAlign: "right",
                ...style
            }}>--</Typography>
        )
    }

    return (
        <Typography sx={{
            fontSize: "1.25rem",
            color: theme.palette.primary.light,
            width: "fit-content",
            maxWidth: "5rem",
            textAlign: "right",
            ...style
        }}>{formatPrice(product.selectedPrice.unit_amount * product.quantity, product.selectedPrice.currency)}</Typography>
    )
}

export default function ProductCard({
    product,
    addToCart,
    style = {}
}: {
    product: StripeProduct,
    addToCart: UseCart['add'],
    style?: CSSProperties
}) {

    const router = useRouter();
    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);

    const [copyOfProduct, setCopyOfProduct] = useState(product);

    useEffect(() => {
        if (!product.prices || product.prices.length === 0) {
            return;
        }

        setCopyOfProduct({
            ...product,
            selectedPrice: product.prices[0]
        })
    }, [product]);


    const handleAddToCart = (e : any) => {
        e.stopPropagation();

        if (!product || !product.prices) {
            alert("Could not get prices for this item.")
            return;
        }
        addToCart(copyOfProduct)
    }

    const handleChangePrice = (newPrice: StripePrice) => {
        setCopyOfProduct(prev => ({
            ...prev,
            selectedPrice: newPrice
        }))
    }

    return (
        <ButtonBase className="column left top"
            disableRipple
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => router.push(`/item/${product.id}`)}
            style={{
                width: "22.5rem",
                padding: "2rem",
                animation: `popIn 0.5s ease forwards`,
                transform: "scale(0)",
                opacity: 0,
                ...style
            }}>
            {product.images && (
                <div className="column snug center"

                    style={{
                        position: 'relative',
                        width: "100%"
                    }}>
                    <CoverImageCarousel
                        images={product.images}
                        width="100%"
                        height="20rem"
                        isHovering={isHovering}
                        style={{
                            borderRadius: "0.5rem",
                            overflow: 'hidden'
                        }} />
                    {isHovering && (
                        <Button variant="contained"
                            onClick={handleAddToCart}
                            fullWidth
                            sx={{
                                position: 'absolute',
                                bottom: "0.75rem",
                                width: "90%"
                            }}>Add to Cart</Button>
                    )}
                </div>
            )}
            <PriceSelector 
                product={copyOfProduct} 
                handleChangePrice={handleChangePrice} 
            />
            <div className="flex between top"
                style={{
                    opacity: isHovering ? 0.85 : 1,
                transition: "0.25s ease-in-out"
                }}
            >
                <Typography variant="h5" sx={{
                    maxWidth: "calc(100% - 5rem)",
                    width: "fit-content",
                    lineHeight: "115%",
                    textAlign: 'left'
                }}>{product.name}</Typography>
                <DisplayPrice product={copyOfProduct} />
            </div>
        </ButtonBase>
    )
}