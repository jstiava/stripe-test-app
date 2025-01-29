import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "./checkout-session";


async function getAllProducts() {
  try {
    const products = await stripe.products.list({
        limit: 10,
      });
    return products;
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