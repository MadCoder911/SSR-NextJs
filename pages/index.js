import fs from "fs";
import Link from "next/link";
import path from "path";
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product, i) => {
        return (
          <li key={i}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 600, //Page re build every 600 seconds to update content
  };
}

export default HomePage;
