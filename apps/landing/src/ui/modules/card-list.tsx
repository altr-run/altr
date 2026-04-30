import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { CardList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Img from '@/ui/img'
import Overline from '@/ui/overline'
import { moduleAttributes } from '.'

export default function ({
	overline,
	intro,
	cards,
	ctas,
	columns,
	...props
}: CardList) {
	return (
		<section className="section space-y-12 lg:space-y-20" {...moduleAttributes(props)}>
			{(overline || intro) && (
				<header className="grid grid-cols-12 gap-12 lg:gap-24 items-end mb-16">
					<div className="col-span-12 lg:col-span-7">
						<Overline value={overline} className="mb-4" />
						<div className="heading-2">
							<PortableText value={intro ?? []} />
						</div>
					</div>
				</header>
			)}

			{!!cards?.length && (
				<ul
					className={cn(
						'grid gap-12 md:grid-cols-2',
						columns
							? 'lg:grid-cols-[repeat(var(--columns,1),minmax(0px,1fr))]'
							: 'lg:grid-cols-[repeat(auto-fit,minmax(var(--container-3xs),1fr))]',
					)}
					style={{ '--columns': columns }}
				>
					{cards.map((item) => (
						<li key={item._key} className="prose">
							<Img
								className="aspect-video w-full object-cover"
								image={item.image}
								width={400}
								alt=""
							/>

							<Img
								className="h-12 object-cover"
								image={item.icon}
								width={60}
								alt=""
							/>

							<PortableText value={item.content ?? []} />

							<CTAList ctas={item.ctas} className="max-md:*:w-full" />
						</li>
					))}
				</ul>
			)}

			<CTAList ctas={ctas} className="justify-center max-md:*:w-full" />
		</section>
	)
}
