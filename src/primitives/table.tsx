'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<'table'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
      </div>
    );
  }
);

Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<'thead'>
>(({ className, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn('[&_tr]:border-border [&_tr]:border-b', className)} {...props} />
  );
});

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<'tbody'>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn('divide-y divide-border [&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
});

TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<'tfoot'>
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'border-border border-t bg-tertiary/50 font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  );
});

TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn('border-border border-b transition-colors hover:bg-tertiary/50', className)}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<'th'>>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'h-9 px-2 text-left align-middle font-medium text-[11px] text-muted-foreground uppercase tracking-wide',
          className
        )}
        {...props}
      />
    );
  }
);

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<'td'>>(
  ({ className, ...props }, ref) => {
    return (
      <td ref={ref} className={cn('px-2 py-2 align-middle text-[12px]', className)} {...props} />
    );
  }
);

TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentPropsWithoutRef<'caption'>
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-[11px] text-muted-foreground', className)}
      {...props}
    />
  );
});

TableCaption.displayName = 'TableCaption';

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
