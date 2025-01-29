import { StripeAppProps } from "@/types";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import StripeCheckoutForm from "@/components/StripeCheckoutForm";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";


const STRIPE_PUBLISHABLE_KEY = "pk_test_51QmLSsJrcLUH8C2zE5oCKsMmM7N1bATycweqAgVJWL5n1DjO7CdEmPliVKi9lAYQbEIUawdZurjGdQjz7xoCTXz400xuStJ6Eo"
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function Checkout(props: StripeAppProps) {

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch(err => {
                console.log(err);
            });
    }, []);

    const options = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
    } as StripeElementsOptions;

    if (!clientSecret) {
        return <></>;
    }

    return (
        <>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    {confirmed ? <Typography>Complete.</Typography> : (
                        <StripeCheckoutForm />
                    )}
                </Elements>
            )}
        </>
    )
}