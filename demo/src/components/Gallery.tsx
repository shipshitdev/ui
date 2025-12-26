import * as React from 'react';
import { ComponentCard } from './ComponentCard';
import {
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardContent,
  Select,
  Checkbox,
  Label,
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Skeleton,
  Progress,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Textarea,
  Alert,
  AlertTitle,
  AlertDescription,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@agenticindiedev/ui';
import { Info } from 'lucide-react';

const components = [
  {
    name: 'Button',
    category: 'Primitives',
    description: 'Interactive buttons with multiple variants and sizes',
    example: (
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    ),
  },
  {
    name: 'Badge',
    category: 'Primitives',
    description: 'Status indicators and labels',
    example: (
      <div className="flex gap-2 flex-wrap">
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
    ),
  },
  {
    name: 'Input',
    category: 'Primitives',
    description: 'Text input fields with icon support',
    example: <Input placeholder="Enter text..." className="w-full" />,
  },
  {
    name: 'Card',
    category: 'Primitives',
    description: 'Container component with header, content, and footer',
    example: (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Card Title</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Card content goes here</p>
        </CardContent>
      </Card>
    ),
  },
  {
    name: 'Select',
    category: 'Primitives',
    description: 'Accessible dropdown select',
    example: (
      <Select
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
        placeholder="Select an option..."
        className="w-full"
      />
    ),
  },
  {
    name: 'Checkbox',
    category: 'Primitives',
    description: 'Accessible checkbox with label support',
    example: <Checkbox label="Accept terms and conditions" />,
  },
  {
    name: 'Label',
    category: 'Primitives',
    description: 'Form labels',
    example: (
      <div className="space-y-2">
        <Label htmlFor="demo-input">Email</Label>
        <Input id="demo-input" placeholder="Enter email" className="w-full" />
      </div>
    ),
  },
  {
    name: 'Separator',
    category: 'Primitives',
    description: 'Visual separator',
    example: (
      <div className="w-full">
        <div className="p-2">Content above</div>
        <Separator />
        <div className="p-2">Content below</div>
      </div>
    ),
  },
  {
    name: 'Avatar',
    category: 'Primitives',
    description: 'User avatar with image and fallback',
    example: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
  {
    name: 'Skeleton',
    category: 'Primitives',
    description: 'Loading placeholder',
    example: (
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    ),
  },
  {
    name: 'Progress',
    category: 'Primitives',
    description: 'Progress indicator',
    example: <Progress value={65} className="w-full" />,
  },
  {
    name: 'Switch',
    category: 'Primitives',
    description: 'Toggle switch',
    example: (
      <div className="flex items-center space-x-2">
        <Switch id="demo-switch" />
        <Label htmlFor="demo-switch">Enable notifications</Label>
      </div>
    ),
  },
  {
    name: 'RadioGroup',
    category: 'Primitives',
    description: 'Radio button groups',
    example: (
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="r1" />
          <Label htmlFor="r1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="r2" />
          <Label htmlFor="r2">Option 2</Label>
        </div>
      </RadioGroup>
    ),
  },
  {
    name: 'Slider',
    category: 'Primitives',
    description: 'Range slider input',
    example: <Slider defaultValue={[50]} max={100} className="w-full" />,
  },
  {
    name: 'Textarea',
    category: 'Primitives',
    description: 'Multi-line text input',
    example: <Textarea placeholder="Enter message..." className="w-full" />,
  },
  {
    name: 'Alert',
    category: 'Composites',
    description: 'Alert messages with variants',
    example: (
      <Alert className="w-full">
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is an alert message with information.
        </AlertDescription>
      </Alert>
    ),
  },
  {
    name: 'Dialog',
    category: 'Composites',
    description: 'Modal dialogs',
    example: (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a dialog example. Click outside or press ESC to close.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    name: 'DropdownMenu',
    category: 'Composites',
    description: 'Dropdown menus with submenus',
    example: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    name: 'Popover',
    category: 'Composites',
    description: 'Popover overlays',
    example: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium">Popover Content</h4>
            <p className="text-sm text-muted-foreground">
              This is a popover example.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    name: 'Table',
    category: 'Composites',
    description: 'Table components',
    example: (
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Item 1</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item 2</TableCell>
            <TableCell>Inactive</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  {
    name: 'Tabs',
    category: 'Composites',
    description: 'Tab navigation',
    example: (
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for tab 1</TabsContent>
        <TabsContent value="tab2">Content for tab 2</TabsContent>
      </Tabs>
    ),
  },
  {
    name: 'Tooltip',
    category: 'Composites',
    description: 'Tooltip overlays',
    example: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
];

export function Gallery() {
  const categories = Array.from(
    new Set(components.map((c) => c.category))
  ).sort();

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components
              .filter((c) => c.category === category)
              .map((component) => (
                <ComponentCard key={component.name} component={component} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

