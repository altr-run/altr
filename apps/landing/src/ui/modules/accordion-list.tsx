'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence, motion } from 'motion/react'
import { PortableText, stegaClean } from 'next-sanity'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { AccordionList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import { moduleAttributes } from '.'
import { Button } from '@/components/ui/button'

export default function ({
	_key: _module_key,
	intro,
	ctas,
	accordions,
	exclusive,
	enableSchema = true,
	layout: l,
	...props
}: AccordionList & { _key: string }) {
	const layout = stegaClean(l)

	// Build default open values from Sanity `open` field
	const defaultOpen = accordions
		?.filter((a) => a.open)
		.map((a) => a._key) ?? []

	const [openValues, setOpenValues] = useState<string[]>(defaultOpen)

	return (
		<section
			className={cn(
				'section grid gap-8',
				layout === 'horizontal' && 'items-start md:grid-cols-2',
			)}
			{...(enableSchema && {
				itemScope: true,
				itemType: 'https://schema.org/FAQPage',
			})}
			{...moduleAttributes(props)}
		>
			{intro && (
				<header
					className={cn(
						'prose',
						layout === 'horizontal'
							? 'md:sticky-below-header [--offset:1rem]'
							: 'text-center',
					)}
				>
					<PortableText value={intro} />
					<CTAList ctas={ctas} className="max-md:*:w-full" />
				</header>
			)}

			<div className="mx-auto w-full max-w-3xl">
				{exclusive ? (
					// Single — only one open at a time
					<Accordion.Root
						type="single"
						collapsible
						value={openValues[0] ?? ''}
						onValueChange={(v) => setOpenValues(v ? [v] : [])}
					>
						{accordions?.map(({ _key, summary, content }) => (
							<AccordionItem
								key={_key}
								value={_key}
								summary={summary}
								content={content}
								isOpen={openValues[0] === _key}
								enableSchema={enableSchema}
							/>
						))}
					</Accordion.Root>
				) : (
					// Multiple — any number can be open
					<Accordion.Root
						type="multiple"
						value={openValues}
						onValueChange={setOpenValues}
					>
						{accordions?.map(({ _key, summary, content }) => (
							<AccordionItem
								key={_key}
								value={_key}
								summary={summary}
								content={content}
								isOpen={openValues.includes(_key)}
								enableSchema={enableSchema}
							/>
						))}
					</Accordion.Root>
				)}
			</div>
		</section>
	)
}

function AccordionItem({
	value,
	summary,
	content,
	isOpen,
	enableSchema,
}: {
	value: string
	summary?: string
	content?: NonNullable<AccordionList['accordions']>[number]['content']
	isOpen: boolean
	enableSchema: boolean
}) {
	return (
		<Accordion.Item
			value={value}
			className="border-b border-(--border-stroke, var(--line))"
			{...(enableSchema && {
				itemScope: true,
				itemProp: 'mainEntity',
				itemType: 'https://schema.org/Question',
			})}
		>
			<Accordion.Header>
				<Accordion.Trigger asChild>
					<Button
						variant="bare"
						className="flex w-full items-center justify-between gap-4 py-[.5lh] text-left font-bold cursor-pointer"
						{...(enableSchema && { itemProp: 'name' })}
					>
						<span>{summary}</span>
						<motion.span
							animate={{ rotate: isOpen ? 45 : 0 }}
							transition={{ duration: 0.22 }}
							className="w-6 h-6 rounded-full border border-(--line) grid place-items-center font-mono text-sm text-ink-2 flex-shrink-0 transition-colors"
							style={isOpen ? { background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)' } : {}}
						>
							+
						</motion.span>
					</Button>
				</Accordion.Trigger>
			</Accordion.Header>

			<Accordion.Content forceMount asChild>
				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							key="content"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
							style={{ overflow: 'hidden' }}
							{...(enableSchema && {
								itemScope: true,
								itemProp: 'acceptedAnswer',
								itemType: 'https://schema.org/Answer',
							})}
						>
							<div
								className="prose pb-[.75lh]"
								{...(enableSchema && { itemProp: 'text' })}
							>
								<PortableText value={content ?? []} />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</Accordion.Content>
		</Accordion.Item>
	)
}
