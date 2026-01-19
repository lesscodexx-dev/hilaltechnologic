import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      <section className="flex flex-col gap-6">
        <Badge>Digital studio</Badge>
        <h1 className="text-3xl font-semibold text-text">
          Linear-grade digital products, crafted for focused teams.
        </h1>
        <p className="max-w-2xl text-sm text-text-muted">
          Hilal Technologic builds premium templates, playbooks, and bespoke digital
          services. Everything is delivered securely with manual and Midtrans payments.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/products">
            <Button>Browse products</Button>
          </Link>
          <Link href="/services">
            <Button variant="secondary">Explore services</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Product delivery",
            description: "Secure download tokens, 24h validity, and limited access.",
          },
          {
            title: "Midtrans + manual",
            description: "Snap redirect for instant payments or manual verification.",
          },
          {
            title: "Dark-only UI",
            description: "Focused, minimal, and accessible across every page.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <h3 className="text-base font-semibold text-text">{item.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{item.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
