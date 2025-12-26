import { Card, CardHeader, CardContent } from '@agenticindiedev/ui';

interface ComponentCardProps {
  component: {
    name: string;
    category: string;
    description: string;
    example: React.ReactNode;
  };
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{component.name}</h3>
        <p className="text-sm text-muted-foreground">{component.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center min-h-[100px] p-4 bg-muted/50 rounded-md">
          {component.example}
        </div>
      </CardContent>
    </Card>
  );
}
