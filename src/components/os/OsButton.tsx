import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const osButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 border-2 border-ink font-pixel shadow-hard-sm transition-none select-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground hover:bg-muted",
        primary: "bg-primary text-primary-foreground hover:bg-primary-deep",
        highlight: "bg-secondary text-secondary-foreground hover:bg-highlight",
        pressed: "bg-muted text-card-foreground translate-x-[2px] translate-y-[2px] shadow-none",
      },
      size: {
        default: "h-9 px-4 text-sm",
        sm: "h-8 px-2 text-sm",
        icon: "h-5 w-5 p-0 text-xs shadow-none active:translate-x-0 active:translate-y-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function OsButton({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof osButtonVariants>) {
  return <button className={cn(osButtonVariants({ variant, size }), className)} {...props} />;
}
