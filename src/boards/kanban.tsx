import type { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { Badge } from '../primitives/badge';

export type KanbanItemContext<TItem> = {
  columnId: string;
  index: number;
  item: TItem;
};

export type KanbanColumnSpec<TItem> = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  items: TItem[];
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  renderItem: (item: TItem, context: KanbanItemContext<TItem>) => ReactNode;
  renderEmpty?: () => ReactNode;
};

export type KanbanBoardProps<TItem> = {
  columns: KanbanColumnSpec<TItem>[];
  className?: string;
  columnClassName?: string;
  emptyLabel?: ReactNode;
  getItemId?: (item: TItem, context: KanbanItemContext<TItem>) => string;
  renderColumnActions?: (column: KanbanColumnSpec<TItem>) => ReactNode;
};

const toneClassName: Record<NonNullable<KanbanColumnSpec<unknown>['tone']>, string> = {
  default: 'bg-hover text-primary border-border',
  success: 'bg-success/12 text-success border-success/20',
  warning: 'bg-warning/12 text-warning border-warning/20',
  danger: 'bg-danger/12 text-danger border-danger/20',
  info: 'bg-info/12 text-info border-info/20',
  accent: 'bg-accent/10 text-primary border-border-strong',
};

export function KanbanBoard<TItem>({
  columns,
  className,
  columnClassName,
  emptyLabel = 'No items',
  getItemId,
  renderColumnActions,
}: KanbanBoardProps<TItem>) {
  return (
    <div className={cn('grid gap-3 overflow-x-auto md:auto-cols-fr md:grid-flow-col', className)}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          className={columnClassName}
          emptyLabel={emptyLabel}
          getItemId={getItemId}
          renderColumnActions={renderColumnActions}
        />
      ))}
    </div>
  );
}

export type KanbanColumnProps<TItem> = {
  column: KanbanColumnSpec<TItem>;
  className?: string;
  emptyLabel: ReactNode;
  getItemId?: (item: TItem, context: KanbanItemContext<TItem>) => string;
  renderColumnActions?: (column: KanbanColumnSpec<TItem>) => ReactNode;
};

export function KanbanColumn<TItem>({
  column,
  className,
  emptyLabel,
  getItemId,
  renderColumnActions,
}: KanbanColumnProps<TItem>) {
  return (
    <section
      className={cn(
        'flex min-w-[260px] flex-col rounded-lg border border-border bg-secondary/70',
        className
      )}
    >
      <header className="flex items-start justify-between gap-3 border-border border-b p-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium text-primary text-sm">{column.title}</h3>
            <Badge className={cn('shrink-0', toneClassName[column.tone ?? 'default'])}>
              {column.items.length}
            </Badge>
          </div>
          {column.description ? (
            <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
              {column.description}
            </p>
          ) : null}
        </div>
        {renderColumnActions?.(column)}
      </header>

      <div className="flex flex-1 flex-col gap-2 p-2">
        {column.items.length > 0
          ? column.items.map((item, index) => {
              const context = { columnId: column.id, index, item };
              const key = getItemId?.(item, context) ?? `${column.id}-${index}`;
              return <div key={key}>{column.renderItem(item, context)}</div>;
            })
          : (column.renderEmpty?.() ?? (
              <div className="rounded-md border border-border border-dashed p-4 text-center text-muted-foreground text-xs">
                {emptyLabel}
              </div>
            ))}
      </div>
    </section>
  );
}

export type KanbanCardProps = {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function KanbanCard({ title, description, meta, className, onClick }: KanbanCardProps) {
  const Comp = onClick ? 'button' : 'article';

  return (
    <Comp
      type={onClick ? 'button' : undefined}
      className={cn(
        'w-full rounded-md border border-border bg-elevated p-3 text-left transition-colors',
        onClick && 'hover:border-border-strong hover:bg-hover',
        className
      )}
      onClick={onClick}
    >
      <div className="font-medium text-[13px] text-primary leading-snug">{title}</div>
      {description ? (
        <div className="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
          {description}
        </div>
      ) : null}
      {meta ? <div className="mt-3 flex flex-wrap gap-1.5">{meta}</div> : null}
    </Comp>
  );
}
