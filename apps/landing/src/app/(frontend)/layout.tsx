import localFont from 'next/font/local'
import { Mona_Sans } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { preconnect } from 'react-dom'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import VisualEditing from '@/ui/modules/visual-editing'
import '@/app.css'

const fontSans = Mona_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
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
			className={`${fontSans.className} ${fontSerif.variable}`}
			data-scroll-behavior="smooth"
		>
			<NuqsAdapter>
				<body className="bg-background text-foreground antialiased">
					<Header />
					<main>{children}</main>
					<Footer />

					<VisualEditing />
				</body>
			</NuqsAdapter>
		</html>
	)
}
