import s from './home.module.css'

export default function Stamp() {
	return (
		<section className={s.stamp}>
			<div className={s.stampIn}>
				<div className={s.stampBig}>
					This page was <em>written in Altr.</em>
					<br />
					Shipped by <span className={s.stampHl}>@spec &amp; Mukul</span>{' '}
					· build <em>v0.1.2026</em>.
				</div>
				<div className={s.stampConsole}>
					<span className="c">{'// open console · say hi'}</span>
					{'\n'}
					<span className="g">$</span> altr whoami{'\n'}
					{'  '}
					<span className="c">→</span> hi, I&apos;m @spec. you&apos;re
					reading my work.{'\n'}
					<span className="g">$</span> altr ship{'\n'}
					{'  '}
					<span className="c">→</span> one sprint away
					<span className={s.stampBlink} />
				</div>
			</div>
		</section>
	)
}
