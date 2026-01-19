import Link from "next/link";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <nav className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-text">
          Hilal Technologic
        </Link>
        <div className="flex items-center gap-5 text-sm text-text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text">
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/cart"
          className="rounded-md border border-border px-3 py-1.5 text-xs text-text-muted hover:border-accent"
        >
          Cart
        </Link>
      </div>
    </nav>
  );
}
