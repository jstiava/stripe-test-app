import { StripePrice, StripeProduct } from "@/types";
import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Dispatch, SetStateAction } from "react";


export default function PriceSelector({
    product,
    handleChangePrice,
} : {
    product: StripeProduct,
    handleChangePrice: (newPrice : StripePrice) => void,
}) {

    if (!product.selectedPrice || !product.prices || product.prices.length < 2) {
        return (
            <></>
        )
    }

    return (
        <ToggleButtonGroup value={product.selectedPrice.id}>
            {product.prices && product.prices.map(price => (
                <ToggleButton 
                    onClick={() => handleChangePrice(price)}
                sx={{
                    height: "1.5rem"
                }} size="small" value={price.id} key={price.id}>{price.lookup_key}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}