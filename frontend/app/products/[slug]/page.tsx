import type { Metadata } from "next";
import { AddToCartButton } from "@/components/add-to-cart";
import { Card } from "@/components/ui/card";
import { api, type Product } from "@/lib/api";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await api.getProduct(params.slug);
    return {
      title: response.data.name,
      description: response.data.description,
      openGraph: {
        title: response.data.name,
        description: response.data.description,
      },
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let response: Awaited<ReturnType<typeof api.getProduct>> | null = null;
  try {
    response = await api.getProduct(params.slug);
  } catch {
    response = null;
  }

  if (!response?.data) {
    return <div className="mx-auto max-w-3xl px-6 py-12 text-text-muted">Not found.</div>;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <Card>
        <h1 className="text-2xl font-semibold text-text">{response.data.name}</h1>
        <p className="mt-2 text-sm text-text-muted">{response.data.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-text">IDR {response.data.price.toLocaleString()}</span>
          <AddToCartButton product={response.data as Product} />
        </div>
      </Card>
      {response.data.content ? (
        <Card>
          <div className="text-sm text-text-muted">{response.data.content}</div>
        </Card>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: response.data.name,
            description: response.data.description,
            offers: {
              "@type": "Offer",
              price: response.data.price,
              priceCurrency: "IDR",
            },
          }),
        }}
      />
    </div>
  );
}
