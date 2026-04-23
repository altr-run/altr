import s from './home.module.css'
import Nav from './nav'
import Hero from './hero'
import Ticker from './ticker'
import Logos from './logos'
import Manifesto from './manifesto'
import Triptych from './triptych'
import How from './how'
import Metrics from './metrics'
import Testimonials from './testimonials'
import Pullquote from './pullquote'
import Playground from './playground'
import Pricing from './pricing'
import FAQ from './faq'
import CTAClose from './cta-close'
import Stamp from './stamp'
import FooterHome from './footer-home'

export default function HomePage() {
	return (
		<div data-home-page="">
			<div className={s.pageShell}>
				<div className={s.topShell} data-nav-theme="dark">
					<Nav />
					<Hero />
				</div>
				<div data-nav-theme="light">
					<Ticker />
					<Logos />
					<Manifesto />
					<Triptych />
					<How />
					<Metrics />
					<Testimonials />
					<Pullquote />
					<Playground />
					<Pricing />
					<FAQ />
					<CTAClose />
					<Stamp />
					<FooterHome />
				</div>
			</div>
		</div>
	)
}
