'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Cinematic footer curtain reveal.
 *
 * Mechanism (from the reference component):
 *  1. Outer wrapper sits in normal document flow at height = footer height.
 *     `clip-path` creates a new stacking context, which makes the wrapper the
 *     containing block for any `position: fixed` descendant.
 *  2. Inner footer is `position: fixed; bottom: 0` — fixed relative to the
 *     wrapper (not the viewport) because of step 1.
 *  3. As the user scrolls to the wrapper, the clip-path region enters the
 *     viewport from the bottom — revealing the footer like a stage curtain.
 *
 * ResizeObserver keeps the wrapper height in sync with the footer's actual
 * rendered height so the document flow reserves the right amount of space.
 */
export default function FooterReveal({ children }: { children: React.ReactNode }) {
	const innerRef = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		const el = innerRef.current
		if (!el) return

		const ro = new ResizeObserver(() => {
			setHeight(el.offsetHeight)
		})
		ro.observe(el)
		// Measure immediately on mount
		setHeight(el.offsetHeight)
		return () => ro.disconnect()
	}, [])

	return (
		<div
			style={{
				position: 'relative',
				height: height > 0 ? height : 'auto',
				// clip-path creates a stacking context → makes fixed children
				// position relative to this element, not the viewport
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			}}
		>
			<div
				ref={innerRef}
				style={
					height > 0
						? {
								position: 'fixed',
								bottom: 0,
								left: 0,
								right: 0,
							}
						: {
								// Before height is measured, render normally so
								// ResizeObserver can get the real height
								position: 'relative',
							}
				}
			>
				{children}
			</div>
		</div>
	)
}
