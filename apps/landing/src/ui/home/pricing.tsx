import s from './home.module.css'
import Reveal from './reveal'

function Check() {
	return (
		<svg width="13" height="13" viewBox="0 0 13 13">
			<path d="M3 7l2 2 5-5" stroke="var(--acc)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
		</svg>
	)
}

export default function Pricing() {
	return (
		<section className={s.pricing} id="pricing">
			<div className={s.pricingIn}>
				<Reveal className={s.pricingHead}>
					<div>
						<span className={s.over} style={{ display: 'inline-block', marginBottom: 16 }}>
							§ 03 · pricing
						</span>
						<h2 className={s.h2}>
							Per human.
							<br />
							<em>Agents included.</em>
						</h2>
					</div>
					<p className={s.lede}>
						You pay for the people. The cast comes free. BYO model keys on
						any plan, or use ours with generous credits.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.priceGrid}>
						<div className={s.priceCell}>
							<div className={s.priceCellOv}>01 · solo</div>
							<h4>Hacker</h4>
							<div className={s.priceAmt}>
								$19<small>/ mo</small>
							</div>
							<div className={s.priceDesc}>
								For solo founders and indie teams shipping in public.
							</div>
							<ul>
								<li><Check />@spec + @eng teammates</li>
								<li><Check />1 workspace · unlimited specs</li>
								<li><Check />BYO model keys</li>
								<li><Check />Community support</li>
							</ul>
							<a href="#close" className={`${s.btn} ${s.btnGhost}`}>
								Start 14-day trial
							</a>
						</div>
						<div className={`${s.priceCell} ${s.priceCellFeat}`}>
							<div className={s.priceCellOv}>02 · team — recommended</div>
							<h4>
								Studio <em>— the one we use</em>
							</h4>
							<div className={s.priceAmt}>
								$49<small>/ seat / mo</small>
							</div>
							<div className={s.priceDesc}>
								For product teams. Unlimited agents, shared workspaces,
								audit log.
							</div>
							<ul>
								<li><Check />All four teammates as they ship</li>
								<li><Check />Unlimited worktrees &amp; channels</li>
								<li><Check />Shared spec library + search</li>
								<li><Check />SSO, SCIM, audit log export</li>
								<li><Check />$20 model credits / seat / mo</li>
							</ul>
							<a href="#close" className={`${s.btn} ${s.btnAcc}`}>
								Start 14-day trial
							</a>
						</div>
						<div className={s.priceCell}>
							<div className={s.priceCellOv}>03 · enterprise</div>
							<h4>Scale</h4>
							<div className={s.priceAmt} style={{ fontSize: 36, paddingTop: 10 }}>
								Custom
							</div>
							<div className={s.priceDesc}>
								For orgs that need dedicated support, custom policy, or
								on-prem.
							</div>
							<ul>
								<li><Check />Everything in Studio</li>
								<li><Check />Dedicated instance, on-prem option</li>
								<li><Check />Custom policy + DLP integration</li>
								<li><Check />DPA, HIPAA, 99.9% SLA</li>
								<li><Check />Named CSM + onboarding</li>
							</ul>
							<a href="#close" className={`${s.btn} ${s.btnGhost}`}>
								Talk to sales
							</a>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
