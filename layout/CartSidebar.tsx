import { UseCart } from "@/checkout/useCart";
import ProductInBagCard from "@/components/ProductInBagCard";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { Button, Collapse, Divider, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';

import { useState, useEffect } from "react";


export default function CartSidebar({
    Cart
}: {
    Cart: UseCart
}) {

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

   

    useEffect(() => {
        // setConfirmed(new URLSearchParams(window.location.search).get(
        //     "payment_intent_client_secret"
        // ));
    }, []);

    // useEffect(() => {
    //     // Create PaymentIntent as soon as the page loads
    //     fetch("/api/create-payment-intent", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setClientSecret(data.clientSecret))
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, []);

   

    return (
        <Drawer
            anchor="right"
            open={Cart.isSidebarOpen}
            onClose={Cart.toggleSidebar}
            sx={{
                '& .MuiDrawer-paper': {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    width: isSm ? '100vw' : '30rem',
                    right: 0,
                    top: 0,
                    height: `calc(100vh - env(safe-area-inset-top));`,
                    overflow: "hidden",
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    zIndex: 5
                },
            }}
        >
            <div className="column center" style={{
                padding: "3rem 1.5rem"
            }}>
                <div className="flex fit compact">
                    <Typography variant="h5" component="h3" sx={{
                        fontSize: "2.5rem"
                    }}>Your Cart</Typography>
                    <ShoppingBagOutlined sx={{
                        fontSize: "1.5rem"
                    }} />
                </div>
                <Divider style={{
                    width: "100%"
                }} ></Divider>
                {!Cart.cart || Cart.cart.length === 0 ? (
                    <Typography>Cart is empty.</Typography>
                ) : (
                    <div className="column" style={{
                        width: "100%"
                    }}>
                        <TransitionGroup>
                            <Collapse>
                                {Cart.cart.map(product => {
                                    return (
                                        <ProductInBagCard key={product.id} product={product} removeFromCart={() => Cart.remove(product.id)} />
                                    )
                                })}
                            </Collapse>
                        </TransitionGroup>
                    </div>
                )}
                <div className="column" style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 'fit-content',
                    padding: "1rem",
                    width: "100%"
                }}>

                <Button variant="contained">Continue to Checkout</Button>
                </div>
            </div>
        </Drawer>
    )
}