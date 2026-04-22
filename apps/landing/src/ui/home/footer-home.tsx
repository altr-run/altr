import s from './home.module.css'

export default function FooterHome() {
	return (
		<footer className={s.footer}>
			<div className={s.foot}>
				<div>
					<a href="#" className={s.logo} style={{ fontSize: 30 }}>
						a<span className={s.logoSlash}>\</span>tr
					</a>
					<p className={s.footTag}>
						One workspace for the loop. Humans and AI, shipping as peers.
					</p>
				</div>
				<div>
					<h5>Product</h5>
					<a href="#product">Overview</a>
					<a href="#playground">Try it</a>
					<a href="#pricing">Pricing</a>
				</div>
				<div>
					<h5>Company</h5>
					<a href="#">Manifesto</a>
					<a href="#">Changelog</a>
					<a href="#">Careers</a>
				</div>
				<div>
					<h5>Build</h5>
					<a href="#">Docs</a>
					<a href="#">MCP SDK</a>
					<a href="#">API</a>
					<a href="#">Status</a>
				</div>
				<div>
					<h5>Trust</h5>
					<a href="#">Security</a>
					<a href="#">Privacy</a>
					<a href="#">Terms</a>
				</div>
			</div>
			<div className={s.footBot}>
				<span>© 2026 altr labs, inc.</span>
				<span>shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
