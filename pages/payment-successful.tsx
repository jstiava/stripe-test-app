import { StripeAppProps } from "@/types";
import { Button, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";



export default function PaymentSuccessfulPage(props : StripeAppProps) {

    const theme = useTheme();
    const router = useRouter();

    return (
        <div className="column relaxed center top"
        style={{
            width: "100%",
            padding: "15vh 0.5rem 0 0.5rem",
            height: "calc(100vh - 5rem)",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }}>

        <Typography variant="h1" sx={{
            fontSize: "8rem",
            lineHeight: "70%",
            textAlign: 'center'
        }}>Success!</Typography>
        <Typography variant="h2" sx={{
            textAlign: 'center'
        }}>We successfully received your order.</Typography>
        <Button variant="flipped" onClick={() => router.push('/')}>
            Continue
        </Button>
    </div>
    )
}