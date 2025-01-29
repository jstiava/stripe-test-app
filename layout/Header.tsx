import { Typography, useTheme, Tooltip, IconButton, Button, useMediaQuery } from "@mui/material";
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
            onClick={() => {
                router.push('/')
            }}
        >
            <div className="column compact fit center middle" 
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
                    <Tooltip title="My Cart">
                        <IconButton onClick={() => Cart.toggleSidebar()}>
                            <ShoppingBagOutlined sx={{
                                color: theme.palette.primary.contrastText
                            }} />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </header>
    )
}