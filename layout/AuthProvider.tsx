import { ThemeProvider } from "@mui/material";
import { NextComponentType, NextPageContext } from "next";
import NextNProgress from 'nextjs-progressbar';
import theme from '@/styles/theme';
import Header from "./Header";
import Footer from "./Footer";

export default function AuthProvider({
    Component,
    pageProps,
}: {
    Component: NextComponentType<NextPageContext, any, any>;
    pageProps: any;
}) {


    return (
        <ThemeProvider theme={theme}>
            <NextNProgress color={'white'} />
            <Header />
            <div id="content" className="column snug" style={{
                minHeight: "100vh"
            }}>
            <Component {...pageProps} />
            </div>
            <Footer />
        </ThemeProvider>
    )
}