import { StripeAppProps } from "@/types";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import StripeCheckoutForm from "@/components/StripeCheckoutForm";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, Collapse, Divider, Typography } from "@mui/material";
import ProductInBagCard from "@/components/ProductInBagCard";
import { LocalShippingOutlined, PaymentOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import { TransitionGroup } from 'react-transition-group';
import Cart from "./cart";


const STRIPE_PUBLISHABLE_KEY = "pk_test_51QmLSsJrcLUH8C2zE5oCKsMmM7N1bATycweqAgVJWL5n1DjO7CdEmPliVKi9lAYQbEIUawdZurjGdQjz7xoCTXz400xuStJ6Eo"
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function Checkout(props: StripeAppProps) {

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

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

    const options = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
    } as StripeElementsOptions;

    return (
        <div className="column center" style={{
            width: "100%",
            padding: "3rem 1rem"
        }}>
            <div className="flex relaxed top between" style={{
                maxWidth: "70rem",
                width: "100%"
            }}>
                <div className="column compact" style={{
                    width: "45%"
                }}>
                    <div className="flex fit compact">
                        <Typography variant="h5" component="h3" sx={{
                            fontSize: "2.5rem"
                        }}>Order Summary</Typography>
                        <ShoppingBagOutlined sx={{
                            fontSize: "1.5rem"
                        }} />
                    </div>
                    <Divider style={{
                        width: "100%"
                    }} ></Divider>
                    {!props.Cart.cart || props.Cart.cart.length === 0 ? (
                        <Typography>Cart is empty.</Typography>
                    ) : (
                        <div className="column" style={{
                            width: "100%"
                        }}>
                            <TransitionGroup>
                                <Collapse>
                                    {props.Cart.cart.map(product => {
                                        return (
                                            <ProductInBagCard key={product.id} product={product}/>
                                        )
                                    })}
                                </Collapse>
                            </TransitionGroup>
                        </div>
                    )}
                </div>

                <div className="column compact" style={{ width: "45%" }}>
                    {/* <div className="flex fit compact">
                        <Typography variant="h5" component="h3" sx={{
                            fontSize: "2.5rem"
                        }}>Delivery</Typography>
                        <LocalShippingOutlined sx={{
                            fontSize: "1.5rem"
                        }} />
                    </div> */}
                    <div className="flex fit compact">
                        <Typography variant="h5" component="h3" sx={{
                            fontSize: "2.5rem"
                        }}>Checkout</Typography>
                        <PaymentOutlined sx={{
                            fontSize: "1.5rem"
                        }} />
                    </div>
                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            {confirmed ? <Typography>Complete.</Typography> : (
                                <StripeCheckoutForm />
                            )}
                        </Elements>
                    ) : (
                        <Alert severity="error">
                            <AlertTitle>Checkout is unavaliable.</AlertTitle>
                            <Typography variant="caption">Please check your connectivity or regional avaliability.</Typography>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}