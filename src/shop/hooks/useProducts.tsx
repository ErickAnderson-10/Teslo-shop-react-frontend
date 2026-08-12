import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  //TODO: VIENE LOGICA
  const [searchParams] = useSearchParams();
  const { gender } = useParams(); //useParams devuelve un objeto, no devuelve el gender de frente

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const offset = (+page - 1) * +limit;

  const sizes = searchParams.get("sizes") || ""; //getAll siempre devuelve un valor,nunca puede ser nulo. Si no te llega nada, auntomaticamente devuelve [], entonces no es necesario usar ||

  const price = searchParams.get("price") || "any";

  const query = searchParams.get("query") || "";

  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "any":
      // minPrice = undefined;  No es necesario
      // maxPrice = undefined;
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
  }

  return useQuery({
    queryKey: [
      "products",
      { limit, offset, gender, sizes, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        gender: gender,
        sizes: sizes,
        minPrice: minPrice,
        maxPrice: maxPrice,
        query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
