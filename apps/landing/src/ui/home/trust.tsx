import s from './home.module.css'
import Reveal from './reveal'

const PILLARS = [
	{
		mark: '■',
		title: 'Keep the trail on your machine first',
		body: 'SQLite on-device is the starting point. Teams can begin locally, keep sensitive context close, and decide later what should connect outward.',
	},
	{
		mark: '▲',
		title: 'Choose models and providers deliberately',
		body: 'Bring your own model providers, keep keys in the OS keychain, and decide which roles can call which models under which rules.',
	},
	{
		mark: '◆',
		title: 'Keep decisions attributable',
		body: 'Specs, diffs, agent actions, and approvals stay reviewable. Important work still passes through human approval instead of disappearing behind automation.',
	},
	{
		mark: '●',
		title: 'Grow into stricter environments',
		body: 'Start with Mac-native pilots, then move into managed environments, VPCs, or on-prem setups as security and procurement requirements increase.',
	},
] as const

export default function Trust() {
	return (
		<section className={s.trust} id="security">
			<div className={s.trustIn}>
				<Reveal className={s.trustHead}>
					<span
						className={s.over}
						style={{ display: 'inline-block', marginBottom: 20 }}
					>
						§ security &amp; control
					</span>
					<h2 className={s.h2}>
						Your specs and diffs
						<br />
						<em>stay local first.</em>
					</h2>
					<p className={s.trustSub}>
						Control is part of the product surface, not a compliance add-on.
						Teams decide what agents can touch, which models run where, and how
						every decision stays attributable — from first request to merged diff.
					</p>
				</Reveal>
				<div className={s.trustGrid}>
					{PILLARS.map((p, i) => (
						<Reveal key={p.title} delay={i * 90} className={s.trustCard}>
							<span className={s.trustMark}>{p.mark}</span>
							<h3 className={s.trustTitle}>{p.title}</h3>
							<p className={s.trustBody}>{p.body}</p>
						</Reveal>
					))}
				</div>
				<Reveal>
					<div className={s.trustMeta}>
						<span>mac-native · tauri 2 + rust</span>
						<span className={s.trustMetaSep} />
						<span>keys in OS keychain</span>
						<span className={s.trustMetaSep} />
						<span>audit trail preserved</span>
						<span className={s.trustMetaSep} />
						<span>deployment path: local → vpc → on-prem</span>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
