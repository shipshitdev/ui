import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Composites/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Overview</h3>
          <p>View your account overview and summary.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Analytics</h3>
          <p>View detailed analytics and metrics.</p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Reports</h3>
          <p>Generate and view reports.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p>Manage your notification settings.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="general" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold text-lg">General Settings</h3>
          <p className="text-muted-foreground text-sm">Manage your general account settings.</p>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold text-lg">Security Settings</h3>
          <p className="text-muted-foreground text-sm">
            Manage your security and privacy settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="integrations">
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold text-lg">Integrations</h3>
          <p className="text-muted-foreground text-sm">Connect and manage your integrations.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
