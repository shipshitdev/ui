import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    const { getByRole } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders trigger text', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(getByText('Menu')).toBeTruthy();
  });

  it('applies custom className to trigger', () => {
    const { getByRole } = render(
      <DropdownMenu>
        <DropdownMenuTrigger className="custom-trigger">Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(getByRole('button').className).toContain('custom-trigger');
  });

  it('exports all menu components', () => {
    expect(DropdownMenu).toBeTruthy();
    expect(DropdownMenuTrigger).toBeTruthy();
    expect(DropdownMenuContent).toBeTruthy();
    expect(DropdownMenuItem).toBeTruthy();
    expect(DropdownMenuLabel).toBeTruthy();
    expect(DropdownMenuSeparator).toBeTruthy();
    expect(DropdownMenuShortcut).toBeTruthy();
  });

  it('renders shortcut component', () => {
    const { getByText } = render(<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>);
    expect(getByText('⌘K')).toBeTruthy();
  });

  it('applies custom className to shortcut', () => {
    const { container } = render(
      <DropdownMenuShortcut className="custom-shortcut">⌘K</DropdownMenuShortcut>
    );
    expect(container.querySelector('.custom-shortcut')).toBeTruthy();
  });

  it('renders label component', () => {
    const { getByText } = render(<DropdownMenuLabel>Label Text</DropdownMenuLabel>);
    expect(getByText('Label Text')).toBeTruthy();
  });

  it('applies inset class to label', () => {
    const { container } = render(<DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>);
    expect(container.querySelector('.pl-8')).toBeTruthy();
  });

  it('exports all additional components', () => {
    expect(DropdownMenuGroup).toBeTruthy();
    expect(DropdownMenuPortal).toBeTruthy();
    expect(DropdownMenuSub).toBeTruthy();
    expect(DropdownMenuRadioGroup).toBeTruthy();
    expect(DropdownMenuSubTrigger).toBeTruthy();
    expect(DropdownMenuSubContent).toBeTruthy();
    expect(DropdownMenuCheckboxItem).toBeTruthy();
    expect(DropdownMenuRadioItem).toBeTruthy();
  });

  // Coverage for DropdownMenuSubTrigger (lines 23-34)
  it('renders SubTrigger with custom className', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="custom-subtrigger">
              More Options
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.custom-subtrigger')).toBeTruthy();
  });

  it('renders SubTrigger with inset', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Inset Sub</DropdownMenuSubTrigger>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.pl-8')).toBeTruthy();
  });

  it('forwards ref to SubTrigger', () => {
    const ref = { current: null };
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger ref={ref}>Sub</DropdownMenuSubTrigger>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DropdownMenuSubContent (lines 43-49)
  it('renders SubContent with custom className', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="custom-subcontent">
                <DropdownMenuItem>Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.custom-subcontent')).toBeTruthy();
  });

  it('forwards ref to SubContent', () => {
    const ref = { current: null };
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent ref={ref}>
                <DropdownMenuItem>Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DropdownMenuItem with inset (lines 79-86)
  it('renders MenuItem with inset', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.pl-8')).toBeTruthy();
  });

  it('forwards ref to MenuItem', () => {
    const ref = { current: null };
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem ref={ref}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DropdownMenuCheckboxItem (lines 95-110)
  it('renders CheckboxItem', () => {
    const { getByText } = render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Checkbox Item</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(getByText('Checkbox Item')).toBeTruthy();
  });

  it('applies custom className to CheckboxItem', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem className="custom-checkbox" checked={false}>
            Checkbox
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.custom-checkbox')).toBeTruthy();
  });

  it('forwards ref to CheckboxItem', () => {
    const ref = { current: null };
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem ref={ref}>Check</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DropdownMenuRadioItem (lines 119-133)
  it('renders RadioItem', () => {
    const { getByText } = render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1">
            <DropdownMenuRadioItem value="option1">Radio Option 1</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(getByText('Radio Option 1')).toBeTruthy();
  });

  it('applies custom className to RadioItem', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="opt1">
            <DropdownMenuRadioItem className="custom-radio" value="opt1">
              Radio
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.custom-radio')).toBeTruthy();
  });

  it('forwards ref to RadioItem', () => {
    const ref = { current: null };
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="opt1">
            <DropdownMenuRadioItem ref={ref} value="opt1">
              Radio
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DropdownMenuSeparator (lines 159-162)
  it('renders Separator', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.h-px')).toBeTruthy();
  });

  it('applies custom className to Separator', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSeparator className="custom-separator" />
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(document.querySelector('.custom-separator')).toBeTruthy();
  });

  it('forwards ref to Separator', () => {
    const ref = { current: null };
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSeparator ref={ref} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DropdownMenuLabel ref forwarding
  it('forwards ref to Label', () => {
    const ref = { current: null };
    render(<DropdownMenuLabel ref={ref}>Label</DropdownMenuLabel>);
    expect(ref.current).toBeTruthy();
  });
});
