'use client'

import { lazy, Suspense } from 'react'

const Dithering = lazy(() =>
	import('@paper-design/shaders-react').then((mod) => ({
		default: mod.Dithering,
	})),
)

export default function HeroShader({ isHovered }: { isHovered: boolean }) {
	return (
		<div
			className="absolute inset-0 z-0 pointer-events-none"
			style={{
				opacity: 0.28,
				mixBlendMode: 'multiply',
				maskImage:
					'radial-gradient(ellipse 76% 78% at 50% 34%, #000 0%, rgba(0,0,0,0.92) 48%, transparent 90%)',
			}}
			aria-hidden="true"
		>
			<Suspense
				fallback={
					<div
						className="absolute inset-0"
						style={{
							background:
								'radial-gradient(ellipse 72% 68% at 50% 34%, color-mix(in srgb, var(--acc) 22%, transparent), transparent 74%)',
						}}
					/>
				}
			>
				<Dithering
					colorBack="#00000000"
					colorFront="#B7D96A"
					shape="warp"
					type="4x4"
					size={1.45}
					scale={0.88}
					speed={isHovered ? 0.6 : 0.2}
					className="block w-full h-full"
					width="100%"
					height="100%"
					minPixelRatio={1}
				/>
			</Suspense>
		</div>
	)
}
