import { PortableText } from 'next-sanity'
import type { SITE_QUERY_RESULT } from '@/sanity/types'
import Logo from '@/ui/logo'
import SocialNavigation from '@/ui/social-navigation'
import Navigation from './navigation'

export default function Footer({
	site,
}: {
	site: SITE_QUERY_RESULT
}) {
	return (
		<footer>
			<div className="section space-y-4">
				<div className="flex justify-between gap-4 max-md:flex-col md:items-start">
					<div className="flex flex-col items-center gap-4 max-md:text-center md:items-start">
						<Logo site={site} className="[&_img]:h-[2lh]" />
						<PortableText value={site?.footerContent ?? []} />
						<SocialNavigation
							site={site}
							className="[&_svg]:size-lh link flex items-center gap-4 max-md:justify-center"
						/>
					</div>

					<Navigation site={site} />
				</div>

				<div className="[&_a]:link text-center">
					<PortableText value={site?.copyright ?? []} />
				</div>
			</div>
		</footer>
	)
}
