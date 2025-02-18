import ProductCard from "@/components/ProductCard";
import { StripeAppProps, StripeProduct } from "@/types";
import fetchAppServer from "@/utils/fetch";
import { useMediaQuery, useTheme } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home(props: StripeAppProps) {

  const theme = useTheme();
  const [products, setProducts] = useState<StripeProduct[] | null>(null);

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));


  const getProducts = async () => {

    let productList = [];
    let i = 0;

    const productsFetch = await fetch('/api/products');

    if (!productsFetch.ok) {
      return;
    }

    const response = await productsFetch.json();

    for (i; i < response.products.length; i++) {
      const product = response.products[i];
      if (!product.prices || product.prices.length === 0) {
        continue;
      }
      productList.push({
        ...product,
        quantity: 1,
        selectedPrice: product.prices[0]
      })
    }

    setProducts(productList);
  }

  useEffect(() => {
    getProducts();
  }, []);


  if (!products) {
    return <></>
  }


  return (
    <div className="column center"
      style={{
        width: "100%",
        padding: "0.5rem",
        marginTop: "2rem"
      }}>

      <div className={isSm ? 'column compact' : 'flex between'} style={{
        flexWrap: 'wrap',
        color: theme.palette.text.primary,
        maxWidth: "70rem"
      }}>
        {products.map((product, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;

          // Compute animation delay
          const delay = (row + col) * 100;
          return (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={props.Cart.add}
              style={{
                animationDelay: `${delay}ms`,
              }}
            />
          )
        })}
      </div>
    </div>
  );
}
