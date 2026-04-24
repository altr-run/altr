'use client'

import { lazy, Suspense } from 'react'
import s from './home.module.css'

const Dithering = lazy(() =>
	import('@paper-design/shaders-react').then((mod) => ({
		default: mod.Dithering,
	})),
)

export default function HeroShader({ isHovered }: { isHovered: boolean }) {
	return (
		<div className={s.heroShader} aria-hidden="true">
			<Suspense fallback={<div className={s.heroShaderFallback} />}>
				<Dithering
					colorBack="#00000000"
					colorFront="#B7D96A"
					shape="warp"
					type="4x4"
					size={1.45}
					scale={0.88}
					speed={isHovered ? 0.6 : 0.2}
					className={s.heroShaderCanvas}
					width="100%"
					height="100%"
					minPixelRatio={1}
				/>
			</Suspense>
		</div>
	)
}
