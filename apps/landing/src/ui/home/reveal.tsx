'use client'

import { motion, type Variants } from 'motion/react'
import type React from 'react'
import type { ReactNode } from 'react'

const variants: Variants = {
	hidden:  { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 },
}

export default function Reveal({
	children,
	className,
	delay = 0,
	style,
}: {
	children: ReactNode
	className?: string
	delay?: number
	style?: React.CSSProperties
}) {
	return (
		<motion.div
			className={className}
			style={style}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-60px' }}
			variants={variants}
			transition={{
				duration: 0.5,
				ease: [0.25, 1, 0.5, 1],
				delay: delay / 1000,
			}}
		>
			{children}
		</motion.div>
	)
}
