import { CopyrightOutlined, EmailOutlined, HomeOutlined, ScheduleOutlined, StoreOutlined } from "@mui/icons-material";
import { Link, Typography, useMediaQuery, useTheme } from "@mui/material";



export default function Footer() {

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <footer className={"flex middle"} style={{
            width: "100%",
            minHeight: "25vh",
            height: "fit-content",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: "3rem 2rem"
        }}>
            <div className={isSm ? "column relaxed center" : "flex between"}

                style={{
                    width: "100%",
                    maxWidth: "80rem"
                }}>
                <Typography sx={{
                    fontSize: "2rem",
                    textAlign: isSm ? 'center' : 'left'
                }} variant="h2" component="h1">Cozy<br />Threads</Typography>
                <div className="column compact fit">
                    <div className="flex compact fit top">
                        <StoreOutlined fontSize="small" />
                        <Typography>3211 N. Cumberland Avenue<br />Chicago, IL, 23493</Typography>
                    </div>
                    <div className="flex compact fit top">
                        <ScheduleOutlined fontSize="small" />
                        <Typography>Mon-Thu: 8am-8pm, Fri: 8am-3pm</Typography>
                    </div>
                    <div className="flex compact fit top">
                        <EmailOutlined fontSize="small" />
                        <Link href="broken" sx={{
                            color: theme.palette.primary.contrastText,
                            textDecorationColor: theme.palette.primary.contrastText
                        }}>cozythreads@stripe.com</Link>
                    </div>
                    <div className="flex compact fit top">
                        <CopyrightOutlined fontSize="small" />
                        <Link href={"https://terandina.com"} sx={{
                            color: theme.palette.primary.contrastText,
                            textDecorationColor: theme.palette.primary.contrastText
                        }}>Assets Used with Permission from Ternandina</Link>
                    </div>
                    <div className="flex compact fit top">
                        <CopyrightOutlined fontSize="small" />
                        <Link href={"https://terandina.com"} sx={{
                            color: theme.palette.primary.contrastText,
                            textDecorationColor: theme.palette.primary.contrastText
                        }}>Made by Jeremy Stiava</Link>
                    </div>

                </div>
            </div>
        </footer>
    )
}