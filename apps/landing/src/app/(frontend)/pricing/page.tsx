import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Pricing — Altr',
	description: 'Zero-markup AI. You bring the key, we provide the execution loop. Transparent pricing for teams that ship.',
}

const PLANS = [
	{
		name: 'Early Access',
		price: '$0',
		interval: 'during beta',
		desc: 'Join the pilot program and help shape the future of AI-native execution.',
		features: [
			'Unlimited specialist agents',
			'Unlimited execution trails',
			'Local-first storage',
			'BYOK (Bring Your Own Key)',
			'Direct support from founders',
		],
		cta: 'Request access',
		primary: true,
	},
]

export default function PricingPage() {
	return (
		<main className="bg-bg text-ink">
			<section className="border-b border-line px-8 py-[120px] text-center">
				<div className="mx-auto flex flex-col items-center" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="font-mono text-[11px] tracking-widest uppercase text-acc mb-5">Pricing</p>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Zero-markup AI.
						<br />
						<em className="italic text-acc">You bring the key.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[48ch]">
						Altr doesn&apos;t sell AI credits or markup tokens. You connect your own provider directly—paying exactly what the AI costs, with no middleman tax.
					</p>
				</div>
			</section>

			<section className="border-b border-line px-8 py-24">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-12" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
						{/* Why BYOK */}
						<div className="flex flex-col gap-10">
							<div>
								<h2 className="font-serif text-[32px] tracking-tight mb-4">The BYOK Advantage</h2>
								<p className="font-sans text-[16px] text-ink-2 leading-relaxed">
									Most "AI Workspaces" hide their margins inside confusing credit systems. Altr uses a <b>Bring Your Own Key</b> architecture.
								</p>
							</div>

							<div className="grid gap-6">
								{[
									{
										title: 'No Data Markup',
										desc: 'We don\'t charge a premium on top of Anthropic or OpenAI. You pay them directly at cost.',
									},
									{
										title: 'Privacy by Default',
										desc: 'Your keys stay in your macOS Keychain. Your data never touches Altr servers in the LLM path.',
									},
									{
										title: 'Model Choice',
										desc: 'Switch between Sonnet, Haiku, or GPT-4o instantly. Use the model that fits the task budget.',
									},
								].map((item) => (
									<div key={item.title} className="flex gap-4">
										<span className="text-acc font-mono text-[14px] mt-0.5">↳</span>
										<div>
											<p className="font-sans font-semibold text-[15px] text-ink mb-1">{item.title}</p>
											<p className="font-sans text-[14px] text-ink-3 leading-relaxed">{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Plan Card */}
						<div className="bg-bg-1 border border-line rounded-[32px] p-10 flex flex-col gap-8 shadow-sm">
							{PLANS.map((plan) => (
								<div key={plan.name} className="flex flex-col h-full">
									<p className="font-mono text-[11px] uppercase tracking-widest text-ink-4 mb-2">{plan.name}</p>
									<div className="flex items-baseline gap-2 mb-6">
										<span className="font-serif text-[56px] text-ink">{plan.price}</span>
										<span className="font-sans text-ink-3">{plan.interval}</span>
									</div>
									<p className="font-sans text-[15px] text-ink-2 mb-8">{plan.desc}</p>
									
									<div className="flex flex-col gap-4 mb-10">
										{plan.features.map((f) => (
											<div key={f} className="flex items-center gap-3">
												<span className="text-acc text-[10px]">■</span>
												<span className="font-sans text-[14px] text-ink-2">{f}</span>
											</div>
										))}
									</div>

									<a href="/#close" className="btn btn-acc btn-lg w-full mt-auto">
										{plan.cta} →
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Shortcut */}
			<section className="px-8 py-20 text-center border-b border-line">
				<p className="font-sans text-ink-3 mb-6">Have questions about seat limits or enterprise security?</p>
				<Link href="/security" className="font-mono text-[11px] uppercase tracking-widest text-acc no-underline hover:underline">
					View Security & Compliance →
				</Link>
			</section>
		</main>
	)
}
