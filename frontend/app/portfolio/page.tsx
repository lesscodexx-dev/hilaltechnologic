import Link from "next/link";
import { Card } from "@/components/ui/card";
import { api, type Portfolio } from "@/lib/api";

export default async function PortfolioPage() {
  let response = { data: [] as Portfolio[] };
  try {
    response = await api.getPortfolios();
  } catch {
    response = { data: [] as Portfolio[] };
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Portfolio</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {((response.data ?? []) as Portfolio[]).map((item) => (
          <Link key={item.slug} href={`/portfolio/${item.slug}`}>
            <Card className="h-full transition hover:border-accent">
              <h3 className="text-base font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.summary}</p>
            </Card>
          </Link>
        )) ?? <div className="text-text-muted">No portfolio entries yet.</div>}
      </div>
    </div>
  );
}
