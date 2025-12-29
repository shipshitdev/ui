import { ChevronRight, Home } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { Link } from '../Link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      items,
      separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
      showHome = true,
      homeHref = '/',
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center space-x-2 text-sm', className)}
        {...props}
      >
        <ol className="flex items-center space-x-2">
          {showHome && (
            <>
              <li>
                <Link
                  href={homeHref}
                  className="flex items-center text-muted-foreground hover:text-foreground"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              {items.length > 0 && (
                <li aria-hidden="true" className="flex items-center">
                  {separator}
                </li>
              )}
            </>
          )}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <li>
                  {isLast ? (
                    <span className="text-foreground font-medium" aria-current="page">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{item.label}</span>
                  )}
                </li>
                {!isLast && (
                  <li aria-hidden="true" className="flex items-center">
                    {separator}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
