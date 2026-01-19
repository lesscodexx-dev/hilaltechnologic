import Link from "next/link";
import { Card } from "@/components/ui/card";
import { api, type Post } from "@/lib/api";

export default async function BlogPage() {
  let response = { data: [] as Post[] };
  try {
    response = await api.getPosts();
  } catch {
    response = { data: [] as Post[] };
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Blog</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {((response.data ?? []) as Post[]).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full transition hover:border-accent">
              <h3 className="text-base font-semibold text-text">{post.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{post.excerpt}</p>
            </Card>
          </Link>
        )) ?? <div className="text-text-muted">No posts yet.</div>}
      </div>
    </div>
  );
}
