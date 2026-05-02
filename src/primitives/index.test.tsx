import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from './index';

describe('public primitives contract', () => {
  it('exports dialog helpers from the public primitives entrypoint', () => {
    expect(DialogClose).toBeTruthy();
    expect(DialogOverlay).toBeTruthy();
    expect(DialogPortal).toBeTruthy();
    expect(PopoverAnchor).toBeTruthy();
  });

  it('forwards refs for input-like primitives', () => {
    const inputRef = { current: null as HTMLInputElement | null };
    const textareaRef = { current: null as HTMLTextAreaElement | null };
    const labelRef = { current: null as HTMLLabelElement | null };
    const switchRef = { current: null as HTMLButtonElement | null };

    render(
      <>
        <Input ref={inputRef} placeholder="Input" />
        <Textarea ref={textareaRef} placeholder="Textarea" />
        <Label ref={labelRef}>Label</Label>
        <Switch ref={switchRef} />
      </>
    );

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(textareaRef.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(labelRef.current).toBeInstanceOf(HTMLLabelElement);
    expect(switchRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards refs for select primitives', () => {
    const triggerRef = { current: null as HTMLButtonElement | null };
    const contentRef = { current: null as HTMLDivElement | null };
    const itemRef = { current: null as HTMLDivElement | null };

    render(
      <Select open value="alpha" onValueChange={() => {}}>
        <SelectTrigger ref={triggerRef}>
          <SelectValue placeholder="Choose value" />
        </SelectTrigger>
        <SelectContent ref={contentRef}>
          <SelectItem ref={itemRef} value="alpha">
            Alpha
          </SelectItem>
        </SelectContent>
      </Select>
    );

    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards refs for dialog primitives', () => {
    const overlayRef = { current: null as HTMLDivElement | null };
    const contentRef = { current: null as HTMLDivElement | null };
    const titleRef = { current: null as HTMLHeadingElement | null };
    const descriptionRef = { current: null as HTMLParagraphElement | null };

    render(
      <>
        <Dialog open>
          <DialogPortal>
            <DialogOverlay ref={overlayRef} />
          </DialogPortal>
        </Dialog>
        <Dialog open>
          <DialogContent ref={contentRef}>
            <DialogTitle ref={titleRef}>Dialog Title</DialogTitle>
            <DialogDescription ref={descriptionRef}>Dialog Description</DialogDescription>
          </DialogContent>
        </Dialog>
      </>
    );

    expect(overlayRef.current).toBeInstanceOf(HTMLDivElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('forwards refs for dropdown menu and popover content', () => {
    const dropdownContentRef = { current: null as HTMLDivElement | null };
    const dropdownItemRef = { current: null as HTMLDivElement | null };
    const popoverContentRef = { current: null as HTMLDivElement | null };

    render(
      <>
        <DropdownMenu open>
          <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
          <DropdownMenuContent ref={dropdownContentRef}>
            <DropdownMenuItem ref={dropdownItemRef}>Menu item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover open>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent ref={popoverContentRef}>Popover content</PopoverContent>
        </Popover>
      </>
    );

    expect(dropdownContentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(dropdownItemRef.current).toBeInstanceOf(HTMLDivElement);
    expect(popoverContentRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards refs for tabs and table primitives', () => {
    const tabsListRef = { current: null as HTMLDivElement | null };
    const tabsTriggerRef = { current: null as HTMLButtonElement | null };
    const tabsContentRef = { current: null as HTMLDivElement | null };
    const tableRef = { current: null as HTMLTableElement | null };
    const headerRef = { current: null as HTMLTableSectionElement | null };
    const rowRef = { current: null as HTMLTableRowElement | null };
    const cellRef = { current: null as HTMLTableCellElement | null };

    render(
      <>
        <Tabs defaultValue="overview">
          <TabsList ref={tabsListRef}>
            <TabsTrigger ref={tabsTriggerRef} value="overview">
              Overview
            </TabsTrigger>
          </TabsList>
          <TabsContent ref={tabsContentRef} value="overview">
            Content
          </TabsContent>
        </Tabs>
        <Table ref={tableRef}>
          <TableHeader ref={headerRef}>
            <TableRow ref={rowRef}>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell ref={cellRef}>Value</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );

    expect(tabsListRef.current).toBeInstanceOf(HTMLDivElement);
    expect(tabsTriggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(tabsContentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(tableRef.current).toBeInstanceOf(HTMLTableElement);
    expect(headerRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
    expect(cellRef.current).toBeInstanceOf(HTMLTableCellElement);
  });

  it('forwards refs for command primitives', () => {
    const commandRef = { current: null as HTMLDivElement | null };
    const inputRef = { current: null as HTMLInputElement | null };
    const listRef = { current: null as HTMLDivElement | null };
    const groupRef = { current: null as HTMLDivElement | null };
    const itemRef = { current: null as HTMLDivElement | null };

    render(
      <Command ref={commandRef}>
        <CommandInput ref={inputRef} />
        <CommandList ref={listRef}>
          <CommandGroup ref={groupRef} heading="Actions">
            <CommandItem ref={itemRef}>Open file</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(commandRef.current).toBeInstanceOf(HTMLDivElement);
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(listRef.current).toBeInstanceOf(HTMLDivElement);
    expect(groupRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
