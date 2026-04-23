import s from './home.module.css'
import Reveal from './reveal'

const PILLARS = [
	{
		mark: '■',
		title: 'Local-first',
		body: 'SQLite on your machine is the source of truth. Altr works fully offline. No network calls at launch, no sync required.',
	},
	{
		mark: '▲',
		title: 'Bring your own keys',
		body: 'Your Anthropic and OpenAI keys live in the OS keychain — never in a database, never on a server, never in logs.',
	},
	{
		mark: '◆',
		title: 'No vendor lock-in',
		body: 'Your specs, tickets, and artifacts are plain files in a local SQLite DB. Export or migrate any time. Altr never holds your work hostage.',
	},
] as const

export default function Trust() {
	return (
		<section className={s.trust} id="trust">
			<div className={s.trustIn}>
				<Reveal className={s.trustHead}>
					<span
						className={s.over}
						style={{ display: 'inline-block', marginBottom: 20 }}
					>
						§ security &amp; privacy
					</span>
					<h2 className={s.h2}>
						Built for trust.
						<br />
						<em>Not built on it.</em>
					</h2>
					<p className={s.trustSub}>
						Most AI tools ask you to trust their cloud. Altr is
						designed so you never have to.
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
						<span>mac-native · Tauri 2 + Rust</span>
						<span className={s.trustMetaSep} />
						<span>keys in OS keychain</span>
						<span className={s.trustMetaSep} />
						<span>SQLite on disk</span>
						<span className={s.trustMetaSep} />
						<span>works offline</span>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
