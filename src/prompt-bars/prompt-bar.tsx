'use client';

import { ArrowUp, AtSign, Globe, Paperclip, X } from 'lucide-react';
import { type ChangeEvent, type KeyboardEvent, forwardRef, useLayoutEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { Button, buttonVariants } from '../primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu';
import type {
  PromptBarActionProps,
  PromptBarDefaultProps,
  PromptBarHeaderProps,
  PromptBarInputProps,
  PromptBarProps,
  PromptBarSubmitProps,
  PromptBarToolbarLeftProps,
  PromptBarToolbarProps,
  PromptBarToolbarRightProps,
} from './prompt-bar.types';

export function PromptBar({ className, disabled, children, ...props }: PromptBarProps) {
  return (
    <div
      data-disabled={disabled || undefined}
      className={cn(
        'ssd-prompt-bar flex flex-col rounded-xl border border-border bg-tertiary transition-colors duration-150 focus-within:border-border-strong data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PromptBarHeader({ className, children, ...props }: PromptBarHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 border-border/70 border-b px-3 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const PromptBarInput = forwardRef<HTMLTextAreaElement, PromptBarInputProps>(
  ({ className, onValueChange, onChange, maxRows = 8, minRows = 1, value, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const mergedRef = (el: HTMLTextAreaElement | null) => {
      (internalRef as React.RefObject<HTMLTextAreaElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.RefObject<HTMLTextAreaElement | null>).current = el;
    };

    useLayoutEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      el.style.height = 'auto';
      const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
      const minH = lineHeight * minRows;
      const maxH = lineHeight * maxRows;
      const clamped = Math.min(Math.max(el.scrollHeight, minH), maxH);
      el.style.height = `${clamped}px`;
      el.style.overflowY = el.scrollHeight > maxH ? 'auto' : 'hidden';
    }, [value, minRows, maxRows]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <textarea
        ref={mergedRef}
        value={value}
        onChange={handleChange}
        rows={minRows}
        className={cn(
          'w-full resize-none bg-transparent px-3 pt-2.5 pb-1 font-[inherit] text-[13px] text-primary leading-relaxed placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

PromptBarInput.displayName = 'PromptBarInput';

export function PromptBarToolbar({ className, children, ...props }: PromptBarToolbarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 border-border/70 border-t px-2 py-1.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PromptBarToolbarLeft({ className, children, ...props }: PromptBarToolbarLeftProps) {
  return (
    <div className={cn('flex items-center gap-1 overflow-x-auto', className)} {...props}>
      {children}
    </div>
  );
}

export function PromptBarToolbarRight({
  className,
  children,
  ...props
}: PromptBarToolbarRightProps) {
  return (
    <div className={cn('flex shrink-0 items-center gap-1', className)} {...props}>
      {children}
    </div>
  );
}

export const PromptBarAction = forwardRef<HTMLButtonElement, PromptBarActionProps>(
  ({ className, icon, label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          buttonVariants({ variant: 'ghost', size: label ? 'sm' : 'icon-sm' }),
          'text-secondary',
          className
        )}
        {...props}
      >
        {icon}
        {label ? <span>{label}</span> : null}
      </button>
    );
  }
);

PromptBarAction.displayName = 'PromptBarAction';

export const PromptBarSubmit = forwardRef<HTMLButtonElement, PromptBarSubmitProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="submit"
        aria-label="Submit"
        className={cn(
          'flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition-colors hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-40',
          className
        )}
        {...props}
      >
        {children ?? <ArrowUp className="h-4 w-4" />}
      </button>
    );
  }
);

PromptBarSubmit.displayName = 'PromptBarSubmit';

export function PromptBarDefault({
  value,
  onValueChange,
  placeholder = 'Ask, search, or make anything...',
  disabled = false,
  maxRows = 8,
  contextItems,
  onAddContext,
  showContextRow,
  onAttach,
  showAttachButton = true,
  model,
  modelOptions,
  onModelChange,
  showModelSelector = true,
  onSourcesClick,
  showSourcesButton = true,
  onSubmit,
  submitDisabled,
  headerSlot,
  toolbarLeftSlot,
  toolbarRightSlot,
  className,
}: PromptBarDefaultProps) {
  const hasContextRow =
    showContextRow ?? (!!contextItems?.length || !!onAddContext || !!headerSlot);

  const isSubmitDisabled = submitDisabled ?? (disabled || !value?.trim());

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSubmitDisabled) {
      e.preventDefault();
      onSubmit?.();
    }
  };

  const activeModelLabel = modelOptions?.find((o) => o.value === model)?.label ?? model ?? 'Auto';

  return (
    <PromptBar disabled={disabled} className={className}>
      {hasContextRow ? (
        <PromptBarHeader>
          {headerSlot}
          {contextItems?.map((item) => (
            <Button
              key={item.id}
              variant="pill"
              size="xs"
              className="gap-1"
              onClick={item.onRemove}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.onRemove ? <X className="h-3 w-3" /> : null}
            </Button>
          ))}
          {onAddContext ? (
            <Button variant="pill" size="xs" className="gap-1" onClick={onAddContext}>
              <AtSign className="h-3 w-3" />
              <span>Add context</span>
            </Button>
          ) : null}
        </PromptBarHeader>
      ) : null}

      <PromptBarInput
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        disabled={disabled}
        maxRows={maxRows}
        onKeyDown={handleKeyDown}
      />

      <PromptBarToolbar>
        <PromptBarToolbarLeft>
          {toolbarLeftSlot}
          {showAttachButton ? (
            <PromptBarAction
              icon={<Paperclip className="h-4 w-4" />}
              aria-label="Attach file"
              onClick={onAttach}
              disabled={disabled}
            />
          ) : null}
          {showModelSelector && modelOptions && modelOptions.length > 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <PromptBarAction
                  icon={<span className="h-4 w-4 text-[11px] leading-4">AI</span>}
                  label={activeModelLabel}
                  disabled={disabled}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {modelOptions.map((opt) => (
                  <DropdownMenuItem key={opt.value} onClick={() => onModelChange?.(opt.value)}>
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : showModelSelector ? (
            <PromptBarAction
              icon={<span className="h-4 w-4 text-[11px] leading-4">AI</span>}
              label={activeModelLabel}
              disabled={disabled}
            />
          ) : null}
          {showSourcesButton ? (
            <PromptBarAction
              icon={<Globe className="h-4 w-4" />}
              label="All Sources"
              onClick={onSourcesClick}
              disabled={disabled}
            />
          ) : null}
        </PromptBarToolbarLeft>
        <PromptBarToolbarRight>
          {toolbarRightSlot}
          <PromptBarSubmit disabled={isSubmitDisabled} onClick={onSubmit} />
        </PromptBarToolbarRight>
      </PromptBarToolbar>
    </PromptBar>
  );
}
