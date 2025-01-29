import { useTheme } from "@mui/material";



export default function Footer() {

    const theme = useTheme();

    return (
        <footer style={{
            width: "100%",
            minHeight: "25vh",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }}>
            
        </footer>
    )
}