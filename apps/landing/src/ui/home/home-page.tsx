import s from './home.module.css'
import Nav from './nav'
import Hero from './hero'
import HeroShader from './hero-shader'
import Logos from './logos'
import Triptych from './triptych'
import Flow from './flow'
import Playground from './playground'
import How from './how'
import Trust from './trust'
import Metrics from './metrics'
import Manifesto from './manifesto'
import Testimonials from './testimonials'
import TalkTeam from './talk-team'
import FAQ from './faq'
import CTAClose from './cta-close'
import FooterHome from './footer-home'

export default function HomePage() {
	return (
		<div data-home-page="">
			<div className={s.pageShell}>
				<div className={s.topShell} data-nav-theme="dark">
					<HeroShader isHovered={false} />
					<Nav />
					<Hero />
				</div>
				<div data-nav-theme="light">
					<Logos />
					<Triptych />
					<Flow />
					<Playground />
					<How />
					<Trust />
					<Metrics />
					<Manifesto />
					<Testimonials />
					<TalkTeam />
					<FAQ />
					<CTAClose />
					<FooterHome />
				</div>
			</div>
		</div>
	)
}
