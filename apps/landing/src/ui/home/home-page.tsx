import dynamic from 'next/dynamic'
import Hero from './hero'
import HeroShader from './hero-shader'
import Logos from './logos'
import Flow from './flow'
import ContextLost from './context-lost'
import PaxLive from './pax-live'
import CTACallout from './cta-callout'

const HandoffCalculator = dynamic(() => import('./handoff-calculator'))
const Triptych = dynamic(() => import('./triptych'))
const Manifesto = dynamic(() => import('./manifesto'))
const How = dynamic(() => import('./how'))
const UseCases = dynamic(() => import('./use-cases'))
const Playground = dynamic(() => import('./playground'))
const Trust = dynamic(() => import('./trust'))
const Metrics = dynamic(() => import('./metrics'))
const Testimonials = dynamic(() => import('./testimonials'))
const FAQ = dynamic(() => import('./faq'))
const TalkTeam = dynamic(() => import('./talk-team'))

export default function HomePage() {
	return (
		<div data-home-page="">
			<div className="relative">
				<div
					className="relative overflow-hidden"
					style={{
						background:
							'linear-gradient(180deg, var(--bg) 0%, var(--bg-1) 62%, var(--bg) 100%)',
					}}
					data-nav-theme="light"
				>
					<HeroShader isHovered={false} />
					<Hero />
				</div>
				<div data-nav-theme="light">
					<ContextLost />
					<Flow />
					<PaxLive />
					<CTACallout />
					<Triptych />
					<Logos />
					<Manifesto />
					<How />
					<UseCases />
					<Playground />
					<Trust />
					<Metrics />
					<section className="px-8 py-24 border-b border-line" style={{ background: 'var(--bg-1)' }}>
						<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
							<p className="font-mono text-[11px] uppercase tracking-widest text-acc mb-10 text-center">Calculate your savings</p>
							<HandoffCalculator />
						</div>
					</section>
					<Testimonials />
					<FAQ />
					<TalkTeam />
				</div>
			</div>
		</div>
	)
}
