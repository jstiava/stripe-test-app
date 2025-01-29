import { Typography, useTheme, Tooltip, IconButton } from "@mui/material";
import {
    ShoppingBagOutlined
  } from '@mui/icons-material';
import { useRouter } from "next/router";


export default function Header() {

    const theme = useTheme();
    const router = useRouter();
    return (
        <header 
            className="flex center middle between" 
            style={{
            width: "100%",
            padding: "1.5rem 2rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }}>
            <div className="flex fit"></div>
            <div className="column fit center middle">
            {/* <Typography sx={{
                opacity: "0.65"
            }}>Powered by Stripe</Typography> */}
            <Typography sx={{
                fontSize: "2rem"
            }} variant="h2" component="h1">Cozy Threads</Typography>
            <Typography sx={{
                opacity: "0.65",
                lineHeight: "100%"
            }}>Est. 2025</Typography>
            </div>
            <div className="flex fit">
                <Tooltip title="My Cart">
                    <IconButton onClick={() => router.push('/cart')}>
                        <ShoppingBagOutlined sx={{
                            color: theme.palette.primary.contrastText
                        }} />
                    </IconButton>
                </Tooltip>
            </div>
        </header>
    )
}