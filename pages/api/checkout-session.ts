import { NextApiRequest, NextApiResponse } from "next";

/**
 * https://docs.stripe.com/checkout/quickstart?client=next
 */
export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handleRequest(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method != 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }


    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: '{{PRICE_ID}}',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
    } catch (err) {
        console.log(err);
        res.status(500).json("Something went wrong.");
    }
}