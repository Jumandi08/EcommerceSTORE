import { useEffect, useState } from "react";
import { ProductType, StrapiProductType, transformStrapiProduct } from "@/types/product";

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const json = await res.json();

        // Transform Strapi 5 data to internal format
        const transformedProducts = (json.data || [])
          .filter((product: StrapiProductType) => {
            return product &&
                   product.slug &&
                   product.images?.[0]?.url;
          })
          .map((product: StrapiProductType) => transformStrapiProduct(product));

        setResult(transformedProducts);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching featured products";
        setError(errorMessage);
        setLoading(false);
        setResult(null);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
