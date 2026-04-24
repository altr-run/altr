'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

const Dithering = lazy(() =>
	import('@paper-design/shaders-react').then((mod) => ({
		default: mod.Dithering,
	})),
)

export default function HeroShader({ isHovered }: { isHovered: boolean }) {
	const [shouldLoadShader, setShouldLoadShader] = useState(false)
	const [shouldAnimate, setShouldAnimate] = useState(false)

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		const connection = (
			navigator as Navigator & {
				connection?: { saveData?: boolean }
			}
		).connection
		const prefersStatic =
			media.matches || Boolean(connection?.saveData) || window.innerWidth < 768

		setShouldAnimate(!prefersStatic)

		const schedule = () => setShouldLoadShader(true)
		if ('requestIdleCallback' in window) {
			const idleId = window.requestIdleCallback(schedule, { timeout: 1500 })
			return () => window.cancelIdleCallback(idleId)
		}

		const timeoutId = globalThis.setTimeout(schedule, 300)
		return () => globalThis.clearTimeout(timeoutId)
	}, [])

	return (
		<div
			className="pointer-events-none absolute inset-0 z-0"
			style={{
				opacity: 0.28,
				mixBlendMode: 'multiply',
				maskImage:
					'radial-gradient(ellipse 76% 78% at 50% 34%, #000 0%, rgba(0,0,0,0.92) 48%, transparent 90%)',
			}}
			aria-hidden="true"
		>
			{shouldLoadShader && (
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
						// speed={isHovered ? 0.6 : 0.2}
						speed={shouldAnimate ? (isHovered ? 0.45 : 0.16) : 0}
						className="block h-full w-full"
						width="100%"
						height="100%"
						minPixelRatio={1}
					/>
				</Suspense>
			)}
		</div>
	)
}
