import s from './home.module.css'

export default function Stamp() {
	return (
		<section className={s.stamp}>
			<div className={s.stampIn}>
				<div className={s.stampBig}>
					Built to run
					<br />
					<em>where your team does.</em>
				</div>
				<div className={s.stampConsole}>
					<span className="c">{'// deployment surfaces'}</span>
					{'\n'}
					<span className="g">$</span> altr deploy cloud{'\n'}
					{'  '}
					<span className="c">→</span> fully managed · fastest path to value{'\n'}
					<span className="g">$</span> altr deploy vpc{'\n'}
					{'  '}
					<span className="c">→</span> your perimeter · our control plane{'\n'}
					<span className="g">$</span> altr deploy on-prem{'\n'}
					{'  '}
					<span className="c">→</span> air-gapped when policy demands it{'\n'}
					<span className="g">$</span> altr audit trail
					{'\n'}
					{'  '}
					<span className="c">→</span> thread → spec → pr → review
					<span className={s.stampBlink} />
				</div>
			</div>
		</section>
	)
}
