import { useEffect, useState } from "react";
import useSWR from "swr";
const LastSalesPage = (props) => {
  const [sales, setSales] = useState([]);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://course-api.com/react-store-products",
    fetcher
  );
  useEffect(() => {
    if (data) {
      setSales([...data]);
    }
  }, [data]);
  if (!data) {
    return <p>Loading...!</p>;
  }
  if (error) {
    return <p>Filed to load...</p>;
  }
  return (
    <ul>
      {props.sales.map((item, i) => {
        return (
          <li key={i}>
            Name: {item.name} , Price: {item.price}
          </li>
        );
      })}
    </ul>
  );
};

export async function getStaticProps() {
  return fetch("https://course-api.com/react-store-products").then((res) =>
    res.json().then((data) => {
      return { props: { sales: data }, revalidate: 10 };
    })
  );
}

export default LastSalesPage;
