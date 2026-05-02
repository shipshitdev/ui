# @shipshitdev/ui

Shared React UI for Shipshit.dev projects.

This package uses the standalone repo architecture from the original `shipshitdev/ui` package: Vite library build, Storybook docs, Tailwind CSS v4 theme outputs, and public npm exports. The component implementation uses shared shadcn/Radix patterns.

ShipCode-specific UI stays in the ShipCode monorepo package: `@shipcode/ui`. This package is only for generic UI that GenFeed, ShipLead, ShipCut, ShipCode, and future projects can share.

## Install

```bash
bun add @shipshitdev/ui
```

## Use

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@shipshitdev/ui';
import '@shipshitdev/ui/styles.css';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Start</Button>
      </CardContent>
    </Card>
  );
}
```

## Public Exports

- `@shipshitdev/ui`: generic shared UI only.
- `@shipshitdev/ui/primitives`: shadcn-style primitives.
- `@shipshitdev/ui/common`: small common composition helpers.
- `@shipshitdev/ui/boards`: reusable board surfaces like kanban.
- `@shipshitdev/ui/charts`: Recharts-based shared chart primitives.
- `@shipshitdev/ui/flows`: `@xyflow/react` foundation primitives and wrappers.
- `@shipshitdev/ui/workflows`: compatibility alias for `@shipshitdev/ui/flows`.
- `@shipshitdev/ui/design`: theme helpers, `cn`, and design utilities.
- `@shipshitdev/ui/flows.css`: compiled XYFlow base styles plus shared flow theme overrides.
- `@shipshitdev/ui/styles.css`: compiled Shipshit.dev Tailwind v4 theme.
- `@shipshitdev/ui/themes/light` and `@shipshitdev/ui/themes/dark`: composable theme CSS files.
- `@shipshitdev/ui/tailwind.preset`: Tailwind preset for consumers that still use config presets.

Product-specific UI stays in the product repo. ShipCode pipeline/review/diff components belong in `@shipcode/ui`.

## Flows

```tsx
import '@shipshitdev/ui/styles.css';
import '@shipshitdev/ui/flows.css';
import { FlowCanvas, FlowHandle, FlowNodeShell, Position } from '@shipshitdev/ui/flows';
```

`@shipshitdev/ui/flows` is the shared primitive layer only: canvas shell, node shell, handle styling, panel container, and core XYFlow exports. Product-specific editors, node registries, stores, and context menus stay in the product repo.

## Charts

```tsx
import '@shipshitdev/ui/styles.css';
import { ChartContainer, ChartTooltipContent, Line, LineChart, Tooltip, XAxis, YAxis } from '@shipshitdev/ui/charts';
```

`@shipshitdev/ui/charts` provides the shared chart shell and tooltip/legend helpers on top of Recharts. Project-specific dashboards and analytics cards stay local.

## Development

```bash
bun install
bun dev
```

`bun dev` starts Storybook. The default Storybook theme is the Shipshit.dev dark visual system.

## Scripts

- `bun run build`: builds JS, CSS, themes, and Tailwind preset.
- `bun run build-storybook`: builds Storybook.
- `bun run typecheck`: validates TypeScript.
- `bun test`: runs package tests.
- `bun run deps:update`: updates dependencies to latest compatible versions.
