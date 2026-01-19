import type { MetadataRoute } from "next";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [products, posts, portfolios] = await Promise.all([
    api.getProducts().catch(() => ({ data: [] as Array<{ slug: string }> })),
    api.getPosts().catch(() => ({ data: [] as Array<{ slug: string }> })),
    api.getPortfolios().catch(() => ({ data: [] as Array<{ slug: string }> })),
  ]);

  const staticRoutes = [
    "",
    "/services",
    "/portfolio",
    "/blog",
    "/products",
    "/cart",
    "/checkout",
    "/account/orders",
    "/contact",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...products.data.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
    })),
    ...posts.data.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
    })),
    ...portfolios.data.map((portfolio) => ({
      url: `${baseUrl}/portfolio/${portfolio.slug}`,
      lastModified: new Date(),
    })),
  ];
}
