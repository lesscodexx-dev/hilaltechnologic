import type { Metadata } from "next";
import { Markdown } from "@/components/markdown";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await api.getPost(params.slug);
    return {
      title: response.data.title,
      description: response.data.excerpt,
      openGraph: {
        title: response.data.title,
        description: response.data.excerpt,
        type: "article",
      },
    };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  let response: Awaited<ReturnType<typeof api.getPost>> | null = null;
  try {
    response = await api.getPost(params.slug);
  } catch {
    response = null;
  }

  if (!response?.data) {
    return <div className="mx-auto max-w-3xl px-6 py-12 text-text-muted">Not found.</div>;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <Card>
        <h1 className="text-2xl font-semibold text-text">{response.data.title}</h1>
        <p className="mt-2 text-sm text-text-muted">{response.data.excerpt}</p>
      </Card>
      {response.data.content ? <Markdown content={response.data.content} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: response.data.title,
            description: response.data.excerpt,
          }),
        }}
      />
    </div>
  );
}
