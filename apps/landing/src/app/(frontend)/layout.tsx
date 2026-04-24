import localFont from 'next/font/local'
import { Mona_Sans, Shalimar } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { preconnect } from 'react-dom'
import SiteNav from '@/ui/site/site-nav'
import SiteFooter from '@/ui/site/site-footer'
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
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://cdn.sanity.io')

	return (
		<html
			lang="en"
			className={`${fontSans.className} ${fontSerif.variable} ${fontSignature.variable}`}
			data-scroll-behavior="smooth"
		>
			<NuqsAdapter>
				<body className="bg-background text-foreground antialiased">
					<SiteNav />
					<main>{children}</main>
					<SiteFooter />

					<VisualEditing />
				</body>
			</NuqsAdapter>
		</html>
	)
}
