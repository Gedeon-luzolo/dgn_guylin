import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between gap-2 border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow,border-color,background-color] outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background hover:border-primary/30 rounded-md dark:bg-input/30 dark:hover:bg-input/50 dark:hover:border-primary/40",
        outline:
          "border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 hover:text-foreground rounded-md dark:border-primary/30 dark:hover:bg-primary/10",
        government:
          "border-primary/30 bg-gradient-to-r from-background to-primary/5 hover:from-primary/10 hover:to-primary/15 hover:border-primary text-foreground font-medium rounded-md",
        glassmorphism:
          "border-white/20 bg-white/10 text-white placeholder-white/50 hover:bg-white/15 hover:border-white/30 focus:ring-yellow-500 rounded-xl backdrop-blur-sm",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        default: "h-9",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "glassmorphism",
      size: "default",
    },
  }
);

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        selectTriggerVariants({ variant, size }),
        // États de focus adaptés au style glassmorphism
        variant === "glassmorphism"
          ? "focus-visible:ring-yellow-500 focus-visible:ring-2 focus-visible:border-white/40"
          : "focus-visible:border-primary focus-visible:ring-primary/30 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Styles pour placeholder adaptés
        variant === "glassmorphism"
          ? "data-[placeholder]:text-white/50 whitespace-nowrap"
          : "data-[placeholder]:text-muted-foreground/80 whitespace-nowrap",
        // Styles pour les icônes adaptés
        variant === "glassmorphism"
          ? "[&_svg:not([class*='text-'])]:text-white/70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:[&_svg:not([class*='text-'])]:text-white"
          : "[&_svg:not([class*='text-'])]:text-primary/70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:[&_svg:not([class*='text-'])]:text-primary",
        // Styles pour SelectValue
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-70 transition-opacity hover:opacity-100" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // Base styles avec style glassmorphism
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border border-white/20 shadow-lg backdrop-blur-lg",
          // Couleurs et background avec style glassmorphism
          "bg-white/10 text-white backdrop-saturate-150",
          // Bordure avec gradient subtil
          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none",
          // Animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          // Position popper
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1 relative z-10",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 text-xs text-white/80 font-semibold tracking-wide uppercase",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base styles avec style glassmorphism
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-lg py-2 pl-3 pr-8 text-sm outline-hidden transition-colors duration-150",
        // États interactifs avec style glassmorphism
        "hover:bg-white/15 focus:bg-white/20 focus:text-white data-[state=checked]:bg-yellow-500/20 data-[state=checked]:text-yellow-300 data-[state=checked]:font-medium",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        // Styles pour les icônes
        "[&_svg:not([class*='text-'])]:text-white/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Styles pour les spans
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-yellow-400" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className="font-medium text-white">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "bg-white/20 pointer-events-none -mx-1 my-1 h-px",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-white/70 hover:text-white transition-colors",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-white/70 hover:text-white transition-colors",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
