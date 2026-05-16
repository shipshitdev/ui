import type { ComponentProps, ReactNode, TextareaHTMLAttributes } from 'react';

export type PromptBarProps = ComponentProps<'div'> & {
  disabled?: boolean;
};

export type PromptBarHeaderProps = ComponentProps<'div'>;

export type PromptBarInputProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> & {
  onValueChange?: (value: string) => void;
  maxRows?: number;
  minRows?: number;
};

export type PromptBarToolbarProps = ComponentProps<'div'>;

export type PromptBarToolbarLeftProps = ComponentProps<'div'>;

export type PromptBarToolbarRightProps = ComponentProps<'div'>;

export type PromptBarActionProps = ComponentProps<'button'> & {
  icon: ReactNode;
  label?: ReactNode;
};

export type PromptBarSubmitProps = ComponentProps<'button'>;

export interface PromptBarContextItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onRemove?: () => void;
}

export interface PromptBarModelOption {
  value: string;
  label: string;
}

export interface PromptBarDefaultProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxRows?: number;

  contextItems?: PromptBarContextItem[];
  onAddContext?: () => void;
  showContextRow?: boolean;

  onAttach?: () => void;
  showAttachButton?: boolean;

  model?: string;
  modelOptions?: PromptBarModelOption[];
  onModelChange?: (value: string) => void;
  showModelSelector?: boolean;

  onSourcesClick?: () => void;
  showSourcesButton?: boolean;

  onSubmit?: () => void;
  submitDisabled?: boolean;

  headerSlot?: ReactNode;
  toolbarLeftSlot?: ReactNode;
  toolbarRightSlot?: ReactNode;

  className?: string;
}
