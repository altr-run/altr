import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'The Manifesto — Altr',
	description: 'The 3-person team that ships like 30. Our thesis on the future of AI-native execution.',
}

export default function ManifestoPage() {
	return (
		<main className="bg-bg text-ink">
			<article className="mx-auto px-8 py-[120px] max-w-[720px]">
				<p className="font-mono text-[11px] tracking-widest uppercase text-acc mb-12">The Manifesto</p>
				
				<h1 className="font-serif font-normal tracking-[-0.03em] text-ink mb-16" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05 }}>
					The 3-person team
					<br />
					<em className="italic text-acc">is the new 30.</em>
				</h1>

				<div className="flex flex-col gap-10 font-sans text-[18px] leading-[1.65] text-ink-2">
					<p className="font-medium text-ink">
						We are entering the era of the high-leverage founder.
					</p>

					<p>
						For the last decade, the standard response to product growth was headcount. If you had more features to ship, you hired more engineers. If you had more users to support, you hired more PMs. The result was a &ldquo;Coordination Tax&rdquo; that slowed everything down.
					</p>

					<blockquote className="my-10 border-l-2 border-acc pl-8 py-2">
						<p className="font-serif text-[28px] leading-tight text-ink italic">
							&ldquo;The most productive unit in software is a small team with perfect context.&rdquo;
						</p>
					</blockquote>

					<p>
						Context is the original signal. It&apos;s the Slack thread where a user explained their frustration. It&apos;s the whiteboard sketch of the data model. It&apos;s the specific reason why a certain edge case was handled the way it was.
					</p>

					<p>
						In traditional teams, this context is lost at every handoff. The PM summarizes the thread into a ticket. The Engineer reads the ticket and guesses the intent. The Reviewer reads the code and checks the syntax, but has no idea if it actually solves the original problem.
					</p>

					<h2 className="font-serif text-[32px] text-ink mt-8 mb-2">AI as Coworkers, not Tools</h2>

					<p>
						Altr was built on a different thesis: AI shouldn&apos;t be a plugin in your IDE. It should be a long-running specialist that co-inhabits your workspace.
					</p>

					<p>
						When your agents have access to the same &ldquo;Shared Graph&rdquo; of context that you do, they stop being chatbots and start being teammates. They don&apos;t ask you to re-explain the brief because they were there when the brief was born.
					</p>

					<p>
						Our goal isn&apos;t to replace the engineer or the PM. It&apos;s to eliminate the 40% of their day spent on <b>context reconstruction</b>. 
					</p>

					<p>
						The 3-person team of the future consists of a founder who sets the direction, and a fleet of specialist agents who handle the execution loop—from signal to spec to PR.
					</p>

					<hr className="border-line my-12" />

					<div className="flex flex-col gap-4">
						<p className="font-mono text-[11px] uppercase tracking-widest text-ink-4">The Altr Principles</p>
						<ul className="list-none p-0 m-0 flex flex-col gap-4">
							{[
								['Local-First', 'Your data belongs on your disk, not in our cloud.'],
								['BYOK Sovereignty', 'You pay for the AI at cost. No credit markup.'],
								['Unbroken Trails', 'Never summarize. Always preserve the original signal.'],
								['Human Gates', 'Agents propose. Humans sign off.'],
							].map(([title, desc]) => (
								<li key={title as string}>
									<span className="font-bold text-ink">{title}: </span>
									<span>{desc}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="mt-20 p-10 bg-bg-1 border border-line rounded-[24px] text-center flex flex-col items-center gap-6">
						<p className="font-serif text-[24px] text-ink">Ready to ship with leverage?</p>
						<a href="/#close" className="btn btn-acc btn-lg">Request access →</a>
					</div>
				</div>
			</article>
		</main>
	)
}
