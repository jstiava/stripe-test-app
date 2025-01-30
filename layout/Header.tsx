import { Typography, useTheme, Tooltip, IconButton, Button, useMediaQuery, Badge } from "@mui/material";
import {
    ShoppingBagOutlined
} from '@mui/icons-material';
import { useRouter } from "next/router";
import { UseCart } from "@/checkout/useCart";


export default function Header({ Cart }: {
    Cart: UseCart
}) {

    const theme = useTheme();
    const router = useRouter();

    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <header
            className="flex center middle right"
            style={{
                width: "100%",
                padding: "1.5rem 2rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                cursor: 'pointer',
                height: "8rem"
            }}

        >
            <div className="column compact fit center middle"
                onClick={() => {
                    router.push('/')
                }}
                style={{
                    position: "absolute",
                    left: isSm ? "2rem" : "50vw",
                    width: "10rem",
                    transform: isSm ? "unset" : "translate(-50%, 0)"
                }}>
                <Typography sx={{
                    fontSize: "2rem",
                    textAlign: 'center'
                }} variant="h2" component="h1">Cozy Threads</Typography>
                {!isSm && (

                    <Typography sx={{
                        opacity: "0.65",
                        lineHeight: "100%"
                    }}>Est. 2025</Typography>
                )}
            </div>
            <div className="flex fit">
                {router.asPath === "/checkout" ? (
                    <Button variant="contained" onClick={() => router.push('/')}>Continue Shopping</Button>
                ) : (
                    <div className="flex fit">
                        <Badge
                            badgeContent={Cart.cart?.length || 0}
                            invisible={!Cart.cart || Cart.cart.length === 0}
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.primary.main
                                }
                            }}>
                            <Tooltip title="My Cart">
                                <IconButton onClick={() => Cart.toggleSidebar()}>
                                    <ShoppingBagOutlined sx={{
                                        color: theme.palette.primary.contrastText
                                    }} />
                                </IconButton>
                            </Tooltip>
                        </Badge>
                        <div style={{
                            width: "0rem"
                        }}></div>
                                    {Cart.cart && Cart.cart.length > 0 && (
                                        <Button variant="flipped" sx={{height: "2.5rem"}}
                                        onClick={() => {
                                            router.push('/checkout');
                                        }}
                                        >Checkout</Button>
                                    )}
                    </div>
                )}
            </div>
        </header>
    )
}