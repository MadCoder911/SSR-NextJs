import { useEffect } from "react";
import fs from "fs";
import path from "path";
const ProductDescription = (props) => {
  const { loadedProduct } = props;
  if (!loadedProduct) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  //
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  //
  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  // tell next.js which instances should be pre generated
  return {
    paths: [{ params: { pid: "p1" } }],
    fallback: true,
  };
}

export default ProductDescription;
