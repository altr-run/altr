import s from './home.module.css'
import ThemeToggle from './theme-toggle'

export default function Nav() {
	return (
		<nav className={s.nav}>
			<div className={s.navIn}>
				<div className={s.navLeft}>
					<a href="#" className={s.logo}>
						a<span className={s.logoSlash}>\</span>tr
					</a>
					<span className={s.navBadge}>
						v0.1 · <b>coming soon</b>
					</span>
				</div>
				<div className={s.navLinks}>
					<a href="#product">Product</a>
					<a href="#playground">Try it</a>
					<a href="#pricing">Pricing</a>
					<a href="#faq">FAQ</a>
					<a href="#manifesto">Manifesto</a>
				</div>
				<div className={s.navRight}>
					<ThemeToggle />
					<a href="#close" className={s.navSignin}>
						Sign in
					</a>
					<a href="#close" className={`${s.btn} ${s.btnPrimary}`}>
						Request access →
					</a>
				</div>
			</div>
		</nav>
	)
}
