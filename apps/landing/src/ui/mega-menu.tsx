'use client'

import * as React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { LuChevronDown } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type MegaMenuItem = {
	id: number
	label: string
	subMenus?: {
		title: string
		items: {
			label: string
			description: string
			icon: React.ElementType
			href: string
		}[]
	}[]
	link?: string
}

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
	items: MegaMenuItem[]
	className?: string
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
	({ items, className, ...props }, ref) => {
		const [openMenu, setOpenMenu] = React.useState<string | null>(null)
		const [isHover, setIsHover] = React.useState<number | null>(null)

		const handleHover = (menuLabel: string | null) => {
			setOpenMenu(menuLabel)
		}

		return (
			<ul
				ref={ref}
				className={cn('relative flex items-center space-x-0', className)}
				{...props}
			>
				{items.map((navItem) => (
					<li
						key={navItem.label}
						className="relative"
						onMouseEnter={() => handleHover(navItem.label)}
						onMouseLeave={() => handleHover(null)}
					>
						{navItem.subMenus ? (
							<Button
								variant="bare"
								type="button"
								className="text-current/72 hover:text-current group relative flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors duration-300"
								onMouseEnter={() => setIsHover(navItem.id)}
								onMouseLeave={() => setIsHover(null)}
							>
								<span>{navItem.label}</span>
								<LuChevronDown
									className={cn(
										'h-4 w-4 transition-transform duration-300 group-hover:rotate-180',
										openMenu === navItem.label && 'rotate-180',
									)}
								/>
								{(isHover === navItem.id || openMenu === navItem.label) && (
									<motion.div
										layoutId="hover-bg"
										className="bg-foreground/8 absolute inset-0 size-full"
										style={{ borderRadius: 99 }}
									/>
								)}
							</Button>
						) : (
							<Link
								href={navItem.link ?? '#'}
								className="text-current/72 hover:text-current group relative flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors duration-300"
								onMouseEnter={() => setIsHover(navItem.id)}
								onMouseLeave={() => setIsHover(null)}
							>
								<span>{navItem.label}</span>
								{isHover === navItem.id && (
									<motion.div
										layoutId="hover-bg"
										className="bg-foreground/8 absolute inset-0 size-full"
										style={{ borderRadius: 99 }}
									/>
								)}
							</Link>
						)}

						<AnimatePresence>
							{openMenu === navItem.label && navItem.subMenus && (
								<div className="absolute left-0 top-full z-10 w-auto pt-2">
									<motion.div
										layoutId="menu"
										className="border-stroke/80 bg-background/96 w-max p-4 shadow-xl backdrop-blur-md"
										style={{ borderRadius: 16 }}
									>
										<div className="flex w-fit shrink-0 space-x-9 overflow-hidden">
											{navItem.subMenus.map((sub) => (
												<motion.div layout className="w-full" key={sub.title}>
													<h3 className="text-foreground/50 mb-4 text-sm font-medium capitalize">
														{sub.title}
													</h3>
													<ul className="space-y-6">
														{sub.items.map((item) => {
															const Icon = item.icon
															return (
																<li key={item.label}>
																	<Link
																		href={item.href}
																		className="group flex items-start space-x-3"
																	>
																		<div className="border-stroke/70 text-foreground flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors duration-300 group-hover:bg-white group-hover:text-[#0A0A0A]">
																			<Icon className="h-5 w-5 flex-none" />
																		</div>
																		<div className="w-max leading-5">
																			<p className="text-foreground shrink-0 text-sm font-medium">
																				{item.label}
																			</p>
																			<p className="text-foreground/55 group-hover:text-foreground/85 shrink-0 text-xs transition-colors duration-300">
																				{item.description}
																			</p>
																		</div>
																	</Link>
																</li>
															)
														})}
													</ul>
												</motion.div>
											))}
										</div>
									</motion.div>
								</div>
							)}
						</AnimatePresence>
					</li>
				))}
			</ul>
		)
	},
)

MegaMenu.displayName = 'MegaMenu'

export default MegaMenu
