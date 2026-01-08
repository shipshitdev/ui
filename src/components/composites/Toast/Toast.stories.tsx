import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, CheckCircle2, Info as InfoIcon, XCircle } from 'lucide-react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Composites/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="min-h-[400px] w-full">
          <Story />
        </div>
        <ToastViewport />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Toast Title</ToastTitle>
      <ToastDescription>This is a default toast notification.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Success: Story = {
  render: () => (
    <Toast variant="success">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4" />
        <ToastTitle>Success!</ToastTitle>
      </div>
      <ToastDescription>Your changes have been saved successfully.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <Toast variant="error">
      <div className="flex items-center gap-2">
        <XCircle className="h-4 w-4" />
        <ToastTitle>Error</ToastTitle>
      </div>
      <ToastDescription>Something went wrong. Please try again later.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast variant="warning">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <ToastTitle>Warning</ToastTitle>
      </div>
      <ToastDescription>Please review your input before submitting.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Info: Story = {
  render: () => (
    <Toast variant="info">
      <div className="flex items-center gap-2">
        <InfoIcon className="h-4 w-4" />
        <ToastTitle>Information</ToastTitle>
      </div>
      <ToastDescription>This is an informational message for your reference.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Toast with Action</ToastTitle>
      <ToastDescription>This toast includes an action button.</ToastDescription>
      <ToastAction altText="Undo">Undo</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Toast>
      <ToastDescription>This toast doesn't have a title.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Toast variant="default">
        <ToastTitle>Default Toast</ToastTitle>
        <ToastDescription>This is a default toast notification.</ToastDescription>
        <ToastClose />
      </Toast>
      <Toast variant="success">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <ToastTitle>Success Toast</ToastTitle>
        </div>
        <ToastDescription>Operation completed successfully.</ToastDescription>
        <ToastClose />
      </Toast>
      <Toast variant="error">
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <ToastTitle>Error Toast</ToastTitle>
        </div>
        <ToastDescription>An error occurred during the operation.</ToastDescription>
        <ToastClose />
      </Toast>
      <Toast variant="warning">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <ToastTitle>Warning Toast</ToastTitle>
        </div>
        <ToastDescription>Please review before proceeding.</ToastDescription>
        <ToastClose />
      </Toast>
      <Toast variant="info">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-4 w-4" />
          <ToastTitle>Info Toast</ToastTitle>
        </div>
        <ToastDescription>Here's some useful information.</ToastDescription>
        <ToastClose />
      </Toast>
    </div>
  ),
};
