import { PortableText } from 'next-sanity'
import type { StatList } from '@/sanity/types'

export default function ({ intro, stats }: StatList) {
	return (
		<section className="section space-y-16 lg:space-y-24">
			{intro && (
				<header className="grid grid-cols-12 gap-12 lg:gap-24 items-end mb-16">
					<div className="col-span-12 lg:col-span-7 heading-2">
						<PortableText value={intro} />
					</div>
				</header>
			)}

			<dl className="mx-auto flex flex-wrap items-start justify-evenly gap-x-12 gap-y-16 max-md:max-w-max max-md:flex-col">
				{stats?.map(({ value, suffix, content = [], _key }) => (
					<div key={_key} className="flex flex-col gap-4">
						<dt className="gap-x-ch flex items-baseline">
							<span className="font-serif text-[64px] lg:text-[84px] leading-none tracking-tight text-ink">{value}</span>
							{suffix && <span className="font-serif text-[32px] lg:text-[44px] text-acc">{suffix}</span>}
						</dt>
						{content && (
							<dd className="prose">
								<PortableText value={content} />
							</dd>
						)}
					</div>
				))}
			</dl>
		</section>
	)
}
