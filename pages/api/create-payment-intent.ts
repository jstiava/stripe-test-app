import { StripePrice } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface StripePriceQuantityStub {
    price: StripePrice,
    quantity: number
}

const calculateOrderAmount = (items : StripePriceQuantityStub[]) => {
  
    let amount = 0;
    for (let i = 0; i < items.length; i++) {
        amount += items[i].price.unit_amount * items[i].quantity;
    }
    return amount;
};

export default async function handleRequest(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
  const { items } = req.body;

  const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

  const subtotal = calculateOrderAmount(items);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: subtotal,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    subtotal: subtotal
  })

};