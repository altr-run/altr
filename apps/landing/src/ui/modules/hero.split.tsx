import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { HeroSplit } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Img from '@/ui/img'
import Overline from '@/ui/overline'
import { moduleAttributes } from '.'

export default function ({
	overline,
	content = [],
	ctas,
	image,
	...props
}: HeroSplit) {
	return (
		<section
			className="inner py-24 md:py-32 grid items-center gap-12 lg:gap-24 md:grid-cols-12"
			{...moduleAttributes(props)}
		>
			<figure
				className={cn(
					'col-span-12 md:col-span-6 lg:col-span-7',
					image?.onRight && 'md:order-last',
					image?.afterContent && 'max-md:order-last',
				)}
			>
				<Img
					className="w-full rounded-[24px] shadow-lg"
					image={image}
					width={800}
					alt={image?.alt ?? ''}
				/>
			</figure>

			<header className="col-span-12 md:col-span-6 lg:col-span-5 prose lg:prose-lg">
				<Overline value={overline} />
				<PortableText value={content} />
				<CTAList ctas={ctas} className="max-md:*:w-full mt-8" />
			</header>
		</section>
	)
}
