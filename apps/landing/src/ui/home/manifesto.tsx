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
						§ a note from the founder
					</span>
					<h2 className={s.manifestoH2}>
						A short manifesto, because{' '}
						<em>we kept having the same meeting.</em>
					</h2>
				</Reveal>
				<Reveal>
					<div className={s.manifestoBody}>
						<div className={s.manifestoMark}>&ldquo;</div>
						<div>
							<p>
								<span className={s.manifestoDrop}>S</span>
								oftware teams keep inventing new ways to
								coordinate, and somehow we keep inventing the
								same new way. A Slack channel becomes a Notion
								doc becomes a Linear ticket becomes a branch
								becomes a PR becomes a Slack channel. The
								knowledge leaks at every boundary. Context dies
								at every handoff.
							</p>
							<p>
								We think the thread should just{' '}
								<b>be the work.</b> The conversation where an
								idea is born should be the same surface where it
								turns into a spec, a branch, a draft PR, and a
								merged change. Not a{' '}
								<em>digital paper trail</em> — a single
								continuous document.
							</p>
							<p>
								We also think AI coworkers deserve{' '}
								<b>real roles, not magic wands.</b> Not a
								chatbot that answers questions. Not a copilot
								that autocompletes. A coworker with a name, a
								memory, a role you can review — one you can{' '}
								<em>disagree with in the margins</em> and trust
								to catch what you missed.
							</p>
							<p>
								Altr is what happens when you pull those two
								threads. It&apos;s the workspace where humans
								and AI ship together —{' '}
								<b>
									as peers, in public, with the full audit
									trail
								</b>{' '}
								— and where the next sprint starts where the
								last one left off. No more status updates. No
								more &ldquo;where&apos;s the spec?&rdquo;. Just
								the work, and everyone, including the agents,
								pulling their weight.
							</p>
							<p className={s.manifestoFade}>
								Thank you for being early. We&apos;re building
								this in the open, one sprint at a time.
							</p>
						</div>
						<div
							className={`${s.manifestoMark} ${s.manifestoMarkEnd}`}
						>
							&rdquo;
						</div>
					</div>
					<div className={s.manifestoSign}>
						<span className={s.manifestoSig}>Mukul</span>
						<div>
							<div>
								<b>Mukul Chugh</b>
							</div>
							<div>Founder · April 2026</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
