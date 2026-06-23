import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="size-4 text-on-surface-variant shrink-0" />
            )}
            {!isLast && item.href ? (
              <Link
                href={item.href}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-on-surface font-medium"
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
