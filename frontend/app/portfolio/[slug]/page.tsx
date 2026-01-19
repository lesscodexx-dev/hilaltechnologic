import type { Metadata } from "next";
import { Markdown } from "@/components/markdown";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await api.getPortfolio(params.slug);
    return {
      title: response.data.title,
      description: response.data.summary,
      openGraph: {
        title: response.data.title,
        description: response.data.summary,
      },
    };
  } catch {
    return { title: "Portfolio not found" };
  }
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  let item: Awaited<ReturnType<typeof api.getPortfolio>> | null = null;
  try {
    item = await api.getPortfolio(params.slug);
  } catch {
    item = null;
  }

  if (!item?.data) {
    return <div className="mx-auto max-w-3xl px-6 py-12 text-text-muted">Not found.</div>;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <Card>
        <h1 className="text-2xl font-semibold text-text">{item.data.title}</h1>
        <p className="mt-2 text-sm text-text-muted">{item.data.summary}</p>
      </Card>
      {item.data.content ? <Markdown content={item.data.content} /> : null}
    </div>
  );
}
