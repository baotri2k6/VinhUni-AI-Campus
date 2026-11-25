import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("", {
  variants: { variant: { primary: "primary", quiet: "quiet" } },
  defaultVariants: { variant: "quiet" },
});

export function Button({
  className,
  variant,
  type = "button",
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button type={type} data-slot="button" className={twMerge(clsx(buttonVariants({ variant }), className))} {...props} />;
}

export function GlassCard({ className, ...props }: ComponentProps<"section">) {
  return <section data-slot="card" className={twMerge(clsx("glass", className))} {...props} />;
}
