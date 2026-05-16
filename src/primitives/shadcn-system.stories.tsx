import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, Sparkles } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta = {
  title: 'Design/Primitives',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const System: Story = {
  render: () => (
    <main className="min-h-screen bg-primary p-8 text-primary">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
              @shipshitdev/ui
            </p>
            <h1 className="mt-2 font-semibold text-3xl tracking-[-0.04em]">
              Shared Shipshit.dev UI
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>
              <Sparkles className="h-4 w-4" />
              Build
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Project command center</CardTitle>
              <CardDescription>Neutral primitives, Shipshit.dev visual system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search projects, issues, workflows..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Routes</CardTitle>
              <CardDescription>Default app shell tabs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">Shared app overview primitives.</TabsContent>
                <TabsContent value="search">Search surface primitives.</TabsContent>
                <TabsContent value="inbox">Inbox surface primitives.</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  ),
};
