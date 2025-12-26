import { Gallery } from './components/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">@agenticindiedev/ui</h1>
          <p className="text-muted-foreground mt-2">
            Component Gallery - Browse all available components
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Gallery />
      </main>
    </div>
  );
}

export default App;
