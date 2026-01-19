import Link from "next/link";
import { Card } from "@/components/ui/card";

const services = [
  {
    slug: "product-strategy",
    title: "Product strategy",
    description: "Discovery, positioning, and roadmap design for digital launches.",
  },
  {
    slug: "design-systems",
    title: "Design systems",
    description: "Linear-grade UI systems, tokens, and component libraries.",
  },
  {
    slug: "automation",
    title: "Automation playbooks",
    description: "AI-ready workflows and integrations for internal teams.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Services</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <Card className="h-full transition hover:border-accent">
              <h3 className="text-base font-semibold text-text">{service.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{service.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
