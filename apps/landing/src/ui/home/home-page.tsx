import dynamic from 'next/dynamic'
import Hero from './hero'
import HeroShader from './hero-shader'
import Logos from './logos'
import Flow from './flow'

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
const CTAClose = dynamic(() => import('./cta-close'))

export default function HomePage() {
	return (
		<div data-home-page="">
			<div className="relative">
				<div
					className="relative overflow-hidden"
					style={{
						background:
							'linear-gradient(180deg, var(--bg) 0%, #f7f4eb 62%, var(--bg) 100%)',
					}}
					data-nav-theme="light"
				>
					<HeroShader isHovered={false} />
					<Hero />
				</div>
				<div data-nav-theme="light">
					<Logos />
					<Flow />
					<Triptych />
					<Manifesto />
					<How />
					<UseCases />
					<Playground />
					<Trust />
					<Metrics />
					<Testimonials />
					<FAQ />
					<TalkTeam />
					<CTAClose />
				</div>
			</div>
		</div>
	)
}
