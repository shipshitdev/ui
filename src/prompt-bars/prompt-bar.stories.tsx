import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Globe, Paperclip, Settings, Sidebar } from 'lucide-react';
import { useState } from 'react';
import {
  PromptBar,
  PromptBarAction,
  PromptBarDefault,
  PromptBarInput,
  PromptBarSubmit,
  PromptBarToolbar,
  PromptBarToolbarLeft,
  PromptBarToolbarRight,
} from './prompt-bar';

const meta: Meta = {
  title: 'PromptBars/PromptBar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

function DarkStage({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-end justify-center bg-primary p-8">
      <div className="w-full max-w-2xl">{children}</div>
    </main>
  );
}

export const Default: Story = {
  render: () => (
    <DarkStage>
      <PromptBarDefault
        onSubmit={() => {}}
        onAttach={() => {}}
        onAddContext={() => {}}
        onSourcesClick={() => {}}
      />
    </DarkStage>
  ),
};

function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <DarkStage>
      <PromptBarDefault
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue('')}
        onAttach={() => {}}
        modelOptions={[
          { value: 'auto', label: 'Auto' },
          { value: 'gpt4', label: 'GPT-4o' },
          { value: 'claude', label: 'Claude' },
        ]}
        model="auto"
      />
    </DarkStage>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const WithContextItems: Story = {
  render: () => (
    <DarkStage>
      <PromptBarDefault
        contextItems={[
          {
            id: '1',
            label: 'README.md',
            icon: <FileText className="h-3 w-3" />,
            onRemove: () => {},
          },
          {
            id: '2',
            label: 'src/index.ts',
            icon: <FileText className="h-3 w-3" />,
            onRemove: () => {},
          },
        ]}
        onAddContext={() => {}}
        onSubmit={() => {}}
      />
    </DarkStage>
  ),
};

export const CustomToolbar: Story = {
  render: () => (
    <DarkStage>
      <PromptBar>
        <PromptBarInput placeholder="Build your own layout..." />
        <PromptBarToolbar>
          <PromptBarToolbarLeft>
            <PromptBarAction icon={<Paperclip className="h-4 w-4" />} aria-label="Attach" />
            <PromptBarAction icon={<Sidebar className="h-4 w-4" />} label="Sidebar" />
            <PromptBarAction icon={<Settings className="h-4 w-4" />} label="Settings" />
            <PromptBarAction icon={<Globe className="h-4 w-4" />} label="Sources" />
          </PromptBarToolbarLeft>
          <PromptBarToolbarRight>
            <PromptBarSubmit />
          </PromptBarToolbarRight>
        </PromptBarToolbar>
      </PromptBar>
    </DarkStage>
  ),
};

export const NoHeader: Story = {
  render: () => (
    <DarkStage>
      <PromptBarDefault showContextRow={false} onSubmit={() => {}} onAttach={() => {}} />
    </DarkStage>
  ),
};

export const Disabled: Story = {
  render: () => (
    <DarkStage>
      <PromptBarDefault
        disabled
        value="This prompt bar is disabled..."
        onSubmit={() => {}}
        onAddContext={() => {}}
      />
    </DarkStage>
  ),
};
