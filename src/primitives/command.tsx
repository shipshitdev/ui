'use client';

import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';
import { cn } from '../lib/utils';
import { Dialog, DialogContent, DialogTitle } from './dialog';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-xl bg-tertiary text-primary',
        className
      )}
      {...props}
    />
  );
});

Command.displayName = 'Command';

function CommandDialog({ children, ...props }: React.ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <DialogContent className="max-w-[640px] overflow-hidden p-0 shadow-lg">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  return (
    <div className="flex items-center border-border border-b px-3">
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-primary text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  );
});

CommandList.displayName = CommandPrimitive.List.displayName;

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty className="py-6 text-center text-muted-foreground text-sm" {...props} />
  );
}
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'overflow-hidden p-1 text-primary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs',
        className
      )}
      {...props}
    />
  );
});

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-hover data-[selected=true]:text-primary data-[disabled=true]:opacity-50',
        className
      )}
      {...props}
    />
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 h-px bg-border', className)}
      {...props}
    />
  );
});

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
