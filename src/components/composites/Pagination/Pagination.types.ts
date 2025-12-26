import type { VariantProps } from 'class-variance-authority';
import type { paginationVariants } from './Pagination';

export interface PaginationProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}
