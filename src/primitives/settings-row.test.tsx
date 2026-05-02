import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SettingsRow } from './settings-row';

describe('SettingsRow', () => {
  it('renders label text', () => {
    const { getByText } = render(
      <SettingsRow label="Dark mode">
        <button type="button">Toggle</button>
      </SettingsRow>
    );
    expect(getByText('Dark mode')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <SettingsRow label="Dark mode">
        <span>Control</span>
      </SettingsRow>
    );
    expect(getByText('Control')).toBeTruthy();
  });

  it('renders label as <span> when htmlFor is not provided', () => {
    const { getByText } = render(
      <SettingsRow label="Notifications">
        <div>toggle</div>
      </SettingsRow>
    );
    expect(getByText('Notifications').tagName).toBe('SPAN');
  });

  it('renders label as <label> when htmlFor is provided', () => {
    const { getByText } = render(
      <SettingsRow label="Notifications" htmlFor="notif-toggle">
        <input id="notif-toggle" type="checkbox" />
      </SettingsRow>
    );
    expect(getByText('Notifications').tagName).toBe('LABEL');
  });

  it('sets the htmlFor attribute on the label element', () => {
    const { getByText } = render(
      <SettingsRow label="Volume" htmlFor="volume-slider">
        <input id="volume-slider" type="range" />
      </SettingsRow>
    );
    expect(getByText('Volume').getAttribute('for')).toBe('volume-slider');
  });

  it('does not render description when not provided', () => {
    const { queryByText } = render(
      <SettingsRow label="Option">
        <div>toggle</div>
      </SettingsRow>
    );
    // Only the label text should be present, no extra <p> text
    expect(queryByText(/description/i)).toBeNull();
  });

  it('renders description when provided', () => {
    const { getByText } = render(
      <SettingsRow label="Notifications" description="Receive email alerts">
        <div>toggle</div>
      </SettingsRow>
    );
    expect(getByText('Receive email alerts')).toBeTruthy();
  });

  it('renders description as a <p> element', () => {
    const { getByText } = render(
      <SettingsRow label="Notifications" description="Receive email alerts">
        <div>toggle</div>
      </SettingsRow>
    );
    expect(getByText('Receive email alerts').tagName).toBe('P');
  });

  it('applies custom className to the wrapper div', () => {
    const { getByText } = render(
      <SettingsRow label="Option" className="custom-class">
        <div>toggle</div>
      </SettingsRow>
    );
    // The wrapper div is the parent of the label span
    const wrapper = getByText('Option').closest('div.flex') as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });

  it('applies base layout classes to the wrapper div', () => {
    const { getByText } = render(
      <SettingsRow label="Option">
        <div>toggle</div>
      </SettingsRow>
    );
    const wrapper = getByText('Option').closest('div.flex') as HTMLElement;
    expect(wrapper.className).toContain('flex');
    expect(wrapper.className).toContain('border-b');
  });
});
