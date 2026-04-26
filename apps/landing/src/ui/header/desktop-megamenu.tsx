'use client'

import type { ElementType } from 'react'
import {
	LuBookOpen,
	LuBoxes,
	LuClipboardList,
	LuFileText,
	LuGlobe,
	LuLayoutGrid,
	LuRocket,
	LuSearch,
	LuShieldCheck,
	LuWorkflow,
} from 'react-icons/lu'
import type { Link, LinkList, Page } from '@/sanity/types'
import { cn } from '@/lib/utils'
import MegaMenu, { type MegaMenuItem } from '@/ui/mega-menu'
import type { SanityLinkType } from '@/ui/sanity-link'

function getLabel(link?: Link) {
	return link?.label || (link?.internal as unknown as Page | undefined)?.title || ''
}

function getHref(link?: Link): string {
	const typedLink = link as SanityLinkType | undefined
	if (typedLink?.type === 'internal' && typedLink.internal?.slug) {
		return [typedLink.internal.slug, typedLink.params].filter(Boolean).join('')
	}

	if (typedLink?.type === 'external' && typedLink.external) {
		return typedLink.external
	}

	return '#'
}

function getDescription(label: string, sectionTitle: string) {
	if (sectionTitle) return `Explore ${sectionTitle}`
	return `Open ${label}`
}

function getIcon(label: string): ElementType {
	const key = label.toLowerCase()

	if (/(doc|guide|readme|manual)/.test(key)) return LuBookOpen
	if (/(blog|press|news|changelog|article)/.test(key)) return LuFileText
	if (/(search|find|discover)/.test(key)) return LuSearch
	if (/(integrat|connect|workflow|automation)/.test(key)) return LuWorkflow
	if (/(compare|use case|template|catalog|collection)/.test(key)) return LuLayoutGrid
	if (/(platform|stack|product|module)/.test(key)) return LuBoxes
	if (/(global|world|web|site)/.test(key)) return LuGlobe
	if (/(secure|security|trust|compliance)/.test(key)) return LuShieldCheck
	if (/(launch|ship|start|rocket)/.test(key)) return LuRocket

	return LuClipboardList
}

function toMegaMenuItems(data: {
	link?: Link
	items?: Array<({ _key: string } & LinkList) | ({ _key: string } & Link)>
}): MegaMenuItem[] {
	const label = getLabel(data.link)

	return [
		{
			id: 1,
			label,
			link: getHref(data.link),
			subMenus: data.items
				?.filter((item): item is LinkList & { _key: string } => item._type === 'link.list')
				.map((section, index) => {
					const title = getLabel(section.link) || `Section ${index + 1}`

					return {
						title,
						items:
							section.links?.map((link) => {
								const itemLabel = getLabel(link)
								return {
									label: itemLabel,
									description: getDescription(itemLabel, title),
									icon: getIcon(itemLabel),
									href: getHref(link),
								}
							}) ?? [],
					}
				})
				.filter((section) => section.items.length > 0),
		},
	]
}

export default function DesktopMegamenu({
	className,
	...props
}: {
	link?: Link
	items?: Array<({ _key: string } & LinkList) | ({ _key: string } & Link)>
	className?: string
}) {
	const items = toMegaMenuItems(props)

	return (
		<MegaMenu
			items={items}
			className={cn(
				'[&_a]:leading-tight [&_button]:leading-tight [&_button]:py-[.5ch] [&_button]:md:py-ch [&_a]:py-[.5ch] [&_a]:md:py-ch',
				className,
			)}
		/>
	)
}
