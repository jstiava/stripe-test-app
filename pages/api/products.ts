import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";


async function getAllProducts() {
  try {
    const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));
    const products = await stripe.products.list({
        limit: 10,
        active: true
      });

    const prices = await stripe.prices.list({
      active: true
    })

    const productsWithPrices = products.data.map(product => {
      return {
        ...product,
        prices: prices.data.filter(price => price.product === product.id)
      }
    })

    return productsWithPrices;
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
}


export default async function handleRequest(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method != 'GET') {
        res.status(405).end('Method Not Allowed');
    }

    try {
       const products = await getAllProducts();

       if (!products) {
        throw Error("No products.")
       }
        res.status(200).json({ 
            message: "Success",
            products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json("Something went wrong.");
    }
}