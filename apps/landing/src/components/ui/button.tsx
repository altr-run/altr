'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Unified button with two variant families:
 *
 * ── Shadcn / dashboard variants (plain Tailwind) ─────────────────────────────
 *    default · destructive · outline · secondary · ghost · link
 *
 * ── Altr landing CTA variants (glass, via CSS classes in app.css) ────────────
 *    acc       — indigo glass pill (primary CTA)
 *    cta-ghost — frosted glass pill (secondary CTA)
 *    cta       — solid indigo (alternate primary)
 *    bare      — no chrome, inherits text style
 *
 * The `href` prop renders as a Next.js Link instead of a <button>.
 * The `asChild` prop delegates rendering to the child via Radix Slot.
 */

const buttonVariants = cva(
	// ── Structural base ────────────────────────────────────────────────────────
	[
		"inline-flex shrink-0 items-center justify-center gap-2",
		"font-medium whitespace-nowrap select-none no-underline",
		"transition-[transform,background,border-color,color,box-shadow] duration-150",
		"outline-none",
		"focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	].join(" "),
	{
		variants: {
			variant: {
				// ── Standard shadcn variants ─────────────────────────────────────────
				default:
					"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60",
				outline:
					"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link:
					"text-primary underline-offset-4 hover:underline",

				// ── Altr CTA glass variants (CSS lives in app.css .btn-glass-*) ─────
				acc:
					"btn-glass-acc text-white font-[560] tracking-[-0.012em] rounded-full border backdrop-blur-[14px] saturate-[1.5] hover:-translate-y-px active:scale-[0.97] active:!duration-[100ms]",
				"cta-ghost":
					"btn-glass-ghost text-[var(--ink)] font-[560] tracking-[-0.012em] rounded-full border backdrop-blur-[20px] saturate-[1.3] hover:-translate-y-px active:scale-[0.97] active:!duration-[100ms]",
				cta:
					"btn-glass-primary text-white font-[560] tracking-[-0.012em] rounded-full border backdrop-blur-[14px] saturate-[1.5] hover:-translate-y-px active:scale-[0.97] active:!duration-[100ms]",
				bare:
					"bg-transparent border-0 p-0 m-0 text-inherit leading-[inherit] font-[inherit] rounded-none",
			},
			size: {
				default: "h-9 px-4 py-2 text-sm has-[>svg]:px-3",
				xs:      "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm:      "h-8 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5",
				lg:      "h-10 rounded-md px-6 text-base has-[>svg]:px-4",
				xl:      "h-12 rounded-md px-8 text-base has-[>svg]:px-6",
				icon:    "size-9",
				"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
				// CTA sizes — override the default h-9 for pill buttons
				"cta-sm": "px-[11px] py-[5px] text-[12px] leading-none",
				"cta-md": "px-[19px] py-[11px] text-[14.5px] leading-none",
				"cta-lg": "px-[23px] py-[13px] text-[15px] leading-none",
				"cta-xl": "px-[28px] py-[16px] text-[16px] leading-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

// Size aliases — landing pages use `size="sm"/"lg"/"xl"` for CTA buttons.
// Map them to CTA pill sizes when the variant is a glass CTA variant.
const CTA_VARIANTS = new Set(["acc", "cta-ghost", "cta"])

function resolveCTASize(
	variant: string | null | undefined,
	size: string | null | undefined,
): string | null | undefined {
	if (!CTA_VARIANTS.has(variant ?? "")) return size
	const map: Record<string, string> = {
		default: "cta-md",
		sm:      "cta-sm",
		lg:      "cta-lg",
		xl:      "cta-xl",
	}
	return map[size ?? "default"] ?? size
}

export interface ButtonProps
	extends Omit<React.ComponentProps<"button">, "size">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	/** Render as Next.js Link */
	href?: string
}

function Button({
	className,
	variant,
	size,
	asChild = false,
	href,
	...props
}: ButtonProps) {
	const resolvedSize = resolveCTASize(variant, size as string)

	const classes = cn(
		buttonVariants({ variant, size: resolvedSize as VariantProps<typeof buttonVariants>["size"] }),
		className,
	)

	// Render as Next.js Link when href provided
	if (href) {
		return (
			<Link href={href} className={classes}>
				{props.children}
			</Link>
		)
	}

	const Comp = asChild ? Slot.Root : "button"
	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={classes}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
