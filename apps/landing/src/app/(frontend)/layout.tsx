import localFont from 'next/font/local'
import { Mona_Sans, Shalimar } from 'next/font/google'
import { groq } from 'next-sanity'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { preconnect } from 'react-dom'
import { sanityFetchLive } from '@/sanity/lib/live'
import SiteNav from '@/ui/site/site-nav'
import type { SiteChromeContent } from '@/ui/site/site-nav'
import SiteFooter from '@/ui/site/site-footer'
import FooterCTA from '@/ui/site/footer-cta'
import FooterReveal from '@/ui/site/footer-reveal'
import VisualEditing from '@/ui/modules/visual-editing'
import '@/app.css'

const fontSans = Mona_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
})

const fontSignature = Shalimar({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-sig',
})


const fontSerif = localFont({
	src: [
		{
			path: '../fonts/SeasonMix-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../fonts/SeasonMix-RegularItalic.otf',
			weight: '400',
			style: 'italic',
		},
	],
	variable: '--font-serif',
	display: 'swap',
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://cdn.sanity.io')
	const chromeContent = await getSiteChromeContent()

	return (
		<html
			lang="en"
			className={`${fontSans.className} ${fontSerif.variable} ${fontSignature.variable}`}
			data-scroll-behavior="smooth"
		>
			<NuqsAdapter>
				<body className="bg-background text-foreground antialiased">
					<SiteNav content={chromeContent} />
					<main>{children}</main>
					<FooterCTA />
					<FooterReveal>
						<SiteFooter content={chromeContent} />
					</FooterReveal>

					<VisualEditing />
				</body>
			</NuqsAdapter>
		</html>
	)
}

async function getSiteChromeContent(): Promise<SiteChromeContent> {
	return sanityFetchLive<SiteChromeContent>({
		query: groq`{
			"useCases": *[_type == 'use-case' && defined(metadata.slug.current) && metadata.noIndex != true]
				| order(title asc){
					title,
					problem,
					"slug": metadata.slug.current
				},
			"integrations": *[_type == 'integration' && defined(metadata.slug.current) && metadata.noIndex != true]
				| order(tool asc){
					tool,
					category,
					domain,
					"slug": metadata.slug.current
				},
			"solutionPages": *[_type == 'page' && metadata.slug.current match 'solutions/*' && metadata.noIndex != true]
				| order(title asc){
					title,
					"slug": metadata.slug.current
				},
			"comparePages": *[_type == 'compare.page' && defined(metadata.slug.current) && metadata.noIndex != true]
				| order(competitor asc){
					competitor,
					"slug": metadata.slug.current
				},
			"legalPages": *[_type == 'legal.page' && defined(slug.current) && noIndex != true]
				| order(title asc){
					title,
					"slug": slug.current
				}
		}`,
	})
}
