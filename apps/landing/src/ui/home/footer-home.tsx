import LogoMark from './logo-mark'
import s from './home.module.css'

export default function FooterHome() {
	return (
		<footer className={s.footer}>
			<div className={s.foot}>
				<div>
					<a href="#" className={`${s.logo} ${s.logoFooter}`}>
						<LogoMark className={s.logoMark} />
						<span className={s.srOnly}>Altr</span>
					</a>
					<p className={s.footTag}>
						One execution loop for product teams and agents.
					</p>
				</div>
				<div>
					<h5>Product</h5>
					<a href="#workflow">Workflow</a>
					<a href="#agents">Agents</a>
					<a href="#stack">Stack</a>
					<a href="#playground">Try it</a>
				</div>
				<div>
					<h5>Use cases</h5>
					<a href="#use-cases">Feature delivery</a>
					<a href="#use-cases">Bug triage</a>
					<a href="#use-cases">PR review</a>
					<a href="#contact">Rollout</a>
				</div>
				<div>
					<h5>Build</h5>
					<a href="#playground">Demo</a>
					<a href="#use-cases">Use cases</a>
					<a href="#faq">FAQ</a>
					<a href="#close">Access</a>
				</div>
				<div>
					<h5>Trust</h5>
					<a href="#security">Security</a>
					<a href="#security">Control</a>
					<a href="#contact">Rollout</a>
					<a href="#close">Contact</a>
				</div>
			</div>
			<div className={s.footBot}>
				<span>© 2026 altr labs, inc.</span>
				<span>shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
