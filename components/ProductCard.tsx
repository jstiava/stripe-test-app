import { StripeProduct } from "@/types"
import { Button, ButtonBase, Typography, useTheme } from "@mui/material"
import CoverImageCarousel from "./CoverImageCarousel";
import { useState } from "react";


export default function ProductCard({
    product,
    addToCart
}: {
    product: StripeProduct,
    addToCart: () => void
}) {

    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    return (
        <ButtonBase className="column"
            disableRipple
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
                width: "22.5rem",
                padding: "2rem"
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
                            onClick={addToCart}
                            fullWidth
                            sx={{
                                position: 'absolute',
                                bottom: "0.75rem",
                                width: "90%"
                            }}>Add to Cart</Button>
                    )}
                </div>
            )}
            <div className="flex between"
                style={{
                    opacity: isHovering ? 0.85 : 1,
                    transition: "0.25s ease-in-out"
                }}
            >
                <Typography variant="h5" sx={{
                    maxWidth: "calc(100% - 5rem)",
                    width: "fit-content"
                }}>{product.name}</Typography>
                <Typography sx={{
                    fontSize: "1.25rem",
                    color: theme.palette.primary.light,
                    width: "5rem",
                    textAlign: "right"
                }}>$45</Typography>
            </div>
        </ButtonBase>
    )
}