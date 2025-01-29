import { StripeProduct } from "@/types"
import { Typography } from "@mui/material"




export default function ProductCard({
    product
} : {
    product : StripeProduct
}) {
    return (
        <div>
           <Typography>{product.name}</Typography>
           <Typography variant="caption"></Typography>
        </div>
    )
}