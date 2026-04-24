import s from './home.module.css'
import Reveal from './reveal'

export default function Manifesto() {
	return (
		<section className={s.manifesto} id="manifesto">
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
						§ the shift
					</span>
					<h2 className={s.manifestoH2}>
						Context dies <em>between the tools.</em>
						<br />
						That&apos;s where the work gets lost.
					</h2>
				</Reveal>
				<Reveal>
					<div className={s.manifestoBody}>
						<div className={s.manifestoMark}>&ldquo;</div>
						<div>
							<p>
								<span className={s.manifestoDrop}>T</span>
								he product signal starts in one place, the
								decision happens in another, and the PR lands
								somewhere else. A request becomes a thread
								becomes a spec becomes a branch becomes a review
								becomes a status update. The team spends more
								time reconnecting the loop than moving it
								forward.
							</p>
							<p>
								Altr keeps the conversation, the artifact, and
								the decision in the same room. The thread turns
								into a spec, the spec stays attached to the diff,
								and the review keeps the full trail intact.{' '}
								<b>The work stays legible as it ships.</b>
							</p>
							<p>
								The result is not another AI surface. It is a
								product workspace where humans and agents can
								operate with the same context, the same memory,
								and the same standard of review from first signal
								to merged change.
							</p>
							<p className={s.manifestoFade}>
								That is the shift: fewer handoffs, fewer shadow
								docs, and a much tighter path from decision to
								what actually ships.
							</p>
						</div>
						<div
							className={`${s.manifestoMark} ${s.manifestoMarkEnd}`}
						>
							&rdquo;
						</div>
					</div>
					<div className={s.manifestoSign}>
						<div className={s.manifestoSigBlock}>
							<span className={s.manifestoSig}>Mukul</span>
							<div className={s.manifestoSigMeta}>
								<span>creating digital experiences for humans</span>
								<a
									href="https://mukulchugh.com"
									target="_blank"
									rel="noopener noreferrer"
									className={s.manifestoSigLink}
								>
									mukulchugh.com →
								</a>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
