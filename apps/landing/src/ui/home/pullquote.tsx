import s from './home.module.css'
import Reveal from './reveal'

export default function Pullquote() {
	return (
		<section className={s.pull}>
			<Reveal className={s.pullIn}>
				<q className={s.pullQ}>
					Altr is the first tool that made my AI teammates feel like{' '}
					<em>teammates</em> — not a chat window I have to babysit.
				</q>
				<div className={s.pullAttr}>
					<span className={s.pullAvatar}>SK</span>
					<div>
						<b>Sana Khoury</b> · Head of Product, Northline
						<div style={{ color: 'var(--ink-4)' }}>
							team of 14 · shipping since march 2026
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	)
}
