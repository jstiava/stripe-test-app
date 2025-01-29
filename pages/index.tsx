import ProductCard from "@/components/ProductCard";
import { StripeAppProps, StripeProduct } from "@/types";
import fetchAppServer from "@/utils/fetch";
import { useTheme } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home(props : StripeAppProps) {

  const theme = useTheme();
  const [products, setProducts] = useState<StripeProduct[] | null>(null);


  const getProducts = async () => {

    const productsFetch = await fetch('/api/products');

    if (!productsFetch.ok) {
      return;
    }

    const response = await productsFetch.json();
    
    setProducts(response.products.data)

  }

  useEffect(() => {
    getProducts();
  }, []);


  if (!products) {
    return <></>
  }


  return (
    <div className="column"
    style={{
      maxWidth: "300rem",
      width: "100%",
      padding: "0.5rem",
    }}>

      <div className="flex" style={{
        flexWrap: 'wrap',
        color: theme.palette.text.primary
      }}>
        {products.map(product => {
          return (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={() => {
                props.Cart.add(product);
                props.Cart.toggleSidebar();
              }} 
            />
          )
        })}
      </div>
    </div>
  );
}
