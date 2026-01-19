import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const serviceMap: Record<string, { title: string; summary: string }> = {
  "product-strategy": {
    title: "Product strategy",
    summary: "Discovery, positioning, and launch planning with stakeholder workshops.",
  },
  "design-systems": {
    title: "Design systems",
    summary: "Dark-only UI kits and component libraries aligned with your brand.",
  },
  automation: {
    title: "Automation playbooks",
    summary: "Automate back-office operations with AI-ready integrations.",
  },
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = serviceMap[params.slug];

  if (!service) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-text-muted">Service not found.</div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <Card>
        <h1 className="text-2xl font-semibold text-text">{service.title}</h1>
        <p className="mt-2 text-sm text-text-muted">{service.summary}</p>
        <div className="mt-6 flex gap-3">
          <Link href="/contact">
            <Button>Request scope</Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="secondary">View portfolio</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
