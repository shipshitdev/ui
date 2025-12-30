import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { Skeleton } from '@/components/primitives/Skeleton';
import { cn } from '@/utils/cn';
import { cursorPointer, disabledStyles, focusStyles, transitionAll } from '@/utils/styles';
import type { TabsContentProps } from './Tabs.types';

const TabsContentSkeleton = () => (
  <div className="space-y-3 p-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-20 w-full" />
  </div>
);

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${transitionAll} ${focusStyles} ${disabledStyles} ${cursorPointer} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-sm text-muted-foreground`,
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, isLoading, skeleton, children, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn(`mt-2 ${focusStyles}`, className)} {...props}>
    {isLoading ? (skeleton ?? <TabsContentSkeleton />) : children}
  </TabsPrimitive.Content>
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
