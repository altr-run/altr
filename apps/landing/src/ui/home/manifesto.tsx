import s from './home.module.css'
import Reveal from './reveal'

const SOURCES = [
	'Slack threads',
	'GitHub PRs',
	'Linear issues',
	'Docs and specs',
	'Customer calls',
	'CI and monitoring',
] as const

export default function Manifesto() {
	return (
		<section className={s.manifesto} id="stack">
			<div className={s.manifestoIn}>
				<Reveal className={s.manifestoHead}>
					<span
						className={s.over}
						style={{
							display: 'inline-block',
							marginBottom: 20,
							justifyContent: 'center',
						}}
					>
						§ connected stack
					</span>
					<h2 className={s.manifestoH2}>
						Pull context from the tools
						<br />
						you already <em>run today.</em>
					</h2>
				</Reveal>
				<Reveal>
					<div className={s.manifestoBody}>
						<div className={s.manifestoMark}>&ldquo;</div>
						<div>
							<p>
								<span className={s.manifestoDrop}>M</span>
								ost teams already have the signal they need. It lives in Slack,
								GitHub, Linear, docs, calls, CI, and incident tools. Altr is not
								trying to replace every system around the work. It is trying to
								keep the <b>same story visible across them.</b>
							</p>
							<p>
								A rough request can start in Slack, pick up an owner in Linear,
								pull code context from GitHub, attach evidence from monitoring,
								and still land in review with the original rationale intact.
							</p>
							<p>
								That means humans and agents can answer practical questions from
								the same trail: what changed, why it changed, what is blocked,
								what is risky, and what still needs review before merge.
							</p>
							<p className={s.manifestoFade}>
								Use the stack you already trust. Stop rewriting the brief at
								every handoff.
							</p>
						</div>
						<div
							className={`${s.manifestoMark} ${s.manifestoMarkEnd}`}
						>
							&rdquo;
						</div>
					</div>
					<div className={s.manifestoRail}>
						<div className={s.manifestoRailLabel}>Typical sources</div>
						<div className={s.manifestoPills}>
							{SOURCES.map((source) => (
								<span key={source} className={s.manifestoPill}>
									{source}
								</span>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
