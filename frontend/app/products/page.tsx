import { ProductsGrid } from "@/components/products-grid";
import { api, type Product } from "@/lib/api";

export default async function ProductsPage() {
  let response = { data: [] as Product[] };
  try {
    response = await api.getProducts();
  } catch {
    response = { data: [] as Product[] };
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Products</h1>
      <ProductsGrid products={(response.data ?? []) as Product[]} />
    </div>
  );
}
