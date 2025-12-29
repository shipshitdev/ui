import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/utils/cn';

export const paginationVariants = cva('', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      class: '[&_button]:h-8 [&_button]:px-2 [&_button]:text-xs',
    },
    {
      size: 'md',
      class: '[&_button]:h-10 [&_button]:px-3 [&_button]:text-sm',
    },
    {
      size: 'lg',
      class: '[&_button]:h-12 [&_button]:px-4 [&_button]:text-base',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = false,
      maxVisible = 5,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const getVisiblePages = () => {
      const pages: (number | string)[] = [];
      const half = Math.floor(maxVisible / 2);

      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);

      if (end - start < maxVisible - 1) {
        if (start === 1) {
          end = Math.min(totalPages, start + maxVisible - 1);
        } else {
          start = Math.max(1, end - maxVisible + 1);
        }
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }

      return pages;
    };

    const visiblePages = getVisiblePages();

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('flex items-center justify-center gap-1', className)}
        {...props}
      >
        <ul className={cn('flex items-center gap-1', paginationVariants({ size }))}>
          {showFirstLast && (
            <li>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                aria-label="First page"
              >
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4 -ml-2" />
              </Button>
            </li>
          )}
          <li>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </li>
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                </li>
              );
            }
            const pageNum = page as number;
            return (
              <li key={pageNum}>
                <Button
                  variant={currentPage === pageNum ? 'primary' : 'outline'}
                  onClick={() => onPageChange(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </Button>
              </li>
            );
          })}
          <li>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </li>
          {showFirstLast && (
            <li>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
              >
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 -ml-2" />
              </Button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
