import { describe, expect, it } from 'vitest';
import {
  FlowCanvas,
  FlowHandle,
  FlowNodeShell,
  FlowPanelContainer,
  Position,
  ReactFlowProvider,
} from './index';

describe('public flows contract', () => {
  it('exports the shared flow primitives', () => {
    expect(FlowCanvas).toBeTruthy();
    expect(FlowHandle).toBeTruthy();
    expect(FlowNodeShell).toBeTruthy();
    expect(FlowPanelContainer).toBeTruthy();
    expect(ReactFlowProvider).toBeTruthy();
  });

  it('re-exports core XYFlow enums', () => {
    expect(Position.Left).toBeDefined();
    expect(Position.Right).toBeDefined();
  });
});
