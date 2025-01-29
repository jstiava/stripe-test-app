import { StripeProduct } from "@/types"
import { Button, ButtonBase, IconButton, Typography, useTheme } from "@mui/material"
import CoverImageCarousel from "./CoverImageCarousel";
import { useState } from "react";
import CoverImage from "./CoverImage";
import { DeleteOutlined } from "@mui/icons-material";


export default function ProductInBagCard({
    product,
    removeFromCart
}: {
    product: StripeProduct,
    removeFromCart: () => void
}) {

    const theme = useTheme();
    return (
        <ButtonBase className="flex between top"
            disableRipple
            style={{
                width: "100%",
                padding: "0.25rem"
            }}>
            {product.images && (
                <CoverImage
                    url={product.images[0]}
                    width="5rem"
                    height="5rem"
                    style={{
                        borderRadius: "0.5rem",
                        overflow: 'hidden'
                    }} />
            )}
            <div className="flex between top"
            style={{width: "calc(100% - 6rem)"}}
            >
                <div className="column snug">
                <Typography variant="h5">{product.name}</Typography>
                <div className="flex fit">
                <IconButton onClick={removeFromCart}>
                    <DeleteOutlined fontSize="small" />
                </IconButton>
                </div>
                </div>
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