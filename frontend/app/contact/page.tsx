import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Contact</h1>
      <Card>
        <div className="grid gap-4">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Textarea placeholder="Tell us about your project" />
          <Button>Send message</Button>
        </div>
      </Card>
    </div>
  );
}
