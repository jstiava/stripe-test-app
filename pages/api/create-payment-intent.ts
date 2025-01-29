import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";


const calculateOrderAmount = (items : any[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items);
  return 1400;
};

export default async function handleRequest(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
  const { items } = req.body;

  const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY))

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  })

};