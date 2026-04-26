import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { BlogCategory, Person } from '@/sanity/types'
import type { BLOG_POST_QUERY_RESULT } from '@/sanity/types'
import Code from '@/ui/modules/prose/code'
import AnchoredHeading from '@/ui/modules/prose/anchored-heading'
import Image from '@/ui/modules/prose/image'
import CustomHTML from '@/ui/modules/custom-html'

type Props = {
	params: Promise<{ slug: string }>
}

const { format } = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
function formatDate(date?: string) {
	if (!date) return null
	return format(new Date(date.replace('-', '/')))
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	const post = await getPost(slug)
	if (!post) notFound()

	const categories = post.categories as unknown as BlogCategory[]
	const author = post.author as unknown as Person

	return (
		<article className="min-h-screen">
			{/* hero header */}
			<header
				className="border-b border-line"
				style={{ background: 'var(--bg-1)' }}
			>
				<div
					className="mx-auto px-8 py-20 max-w-[780px]"
					style={{ maxWidth: '780px' }}
				>
					{/* categories */}
					{categories?.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-6">
							{categories.map((c) => (
								<a
									key={c._id}
									href={`/${ROUTES.blog}?category=${c.slug?.current}`}
									className="font-mono text-[10.5px] uppercase tracking-widest text-acc border border-acc/30 rounded-full px-2.5 py-0.5 no-underline hover:bg-acc/5 transition-colors"
								>
									{c.title}
								</a>
							))}
						</div>
					)}

					<h1
						className="font-serif font-normal text-ink leading-[1.1] mb-6"
						style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', textWrap: 'balance' }}
					>
						{post.title}
					</h1>

					{post.metadata?.description && (
						<p className="font-sans text-[17px] text-ink-3 leading-[1.65] mb-8">
							{post.metadata.description}
						</p>
					)}

					{/* byline */}
					<div className="flex items-center gap-3 pt-6 border-t border-line">
						{author?.name && (
							<>
								{author.image && (
									<img
										src={urlFor(author.image).width(48).height(48).url()}
										alt={author.name}
										className="w-9 h-9 rounded-full object-cover"
									/>
								)}
								<div>
									<div className="font-sans text-[13px] font-medium text-ink">
										{author.name}
									</div>
									<div className="font-mono text-[11px] text-ink-4">
										{formatDate(post.publishDate)}
										{post.readTime
											? ` · ${Math.ceil(post.readTime)} min read`
											: ''}
									</div>
								</div>
							</>
						)}
						{!author?.name && post.publishDate && (
							<span className="font-mono text-[11px] text-ink-4">
								{formatDate(post.publishDate)}
								{post.readTime
									? ` · ${Math.ceil(post.readTime)} min read`
									: ''}
							</span>
						)}
					</div>
				</div>

				{/* cover image */}
				{post.metadata?.image && (
					<div
						className="mx-auto px-8 pb-0"
						style={{ maxWidth: 'var(--maxw)' }}
					>
						<div className="rounded-t-2xl overflow-hidden border border-b-0 border-line aspect-[16/6]">
							<img
								src={urlFor(post.metadata.image).width(1440).height(540).url()}
								alt={post.title ?? ''}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				)}
			</header>

			{/* article body */}
			<div className="mx-auto px-8 py-16" style={{ maxWidth: '720px' }}>
				<div className="prose-altr">
					<PortableText
						value={post.content ?? []}
						components={{
							block: {
								h1: (node) => <AnchoredHeading as="h1" {...node} />,
								h2: (node) => <AnchoredHeading as="h2" {...node} />,
								h3: (node) => <AnchoredHeading as="h3" {...node} />,
								h4: (node) => <AnchoredHeading as="h4" {...node} />,
								h5: (node) => <AnchoredHeading as="h5" {...node} />,
								h6: (node) => <AnchoredHeading as="h6" {...node} />,
							},
							types: {
								image: Image,
								code: Code,
								'custom-html': ({ value }) => (
									<CustomHTML {...value} className="my-6" />
								),
							},
						}}
					/>
				</div>
			</div>

			{/* back link */}
			<div
				className="border-t border-line px-8 py-10"
				style={{ background: 'var(--bg-1)' }}
			>
				<div className="mx-auto" style={{ maxWidth: '720px' }}>
					<a
						href={`/${ROUTES.blog}`}
						className="font-mono text-[11px] uppercase tracking-widest text-ink-3 hover:text-ink transition-colors no-underline"
					>
						← All posts
					</a>
				</div>
			</div>
		</article>
	)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost(slug)
	const { title, description, image, noIndex } = post?.metadata ?? {}

	return {
		title: title ? `${title} — Altr Blog` : 'Altr Blog',
		description,
		openGraph: {
			title: title ?? undefined,
			description: description ?? undefined,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.blog}/${slug}`,
			images: [
				image
					? urlFor(image).width(1200).url()
					: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${ROUTES.blog}/${slug}`,
			],
		},
		robots: {
			index: noIndex ? false : undefined,
		},
		alternates: {
			types: {
				'application/rss+xml': `/${ROUTES.blog}/rss.xml`,
			},
		},
	}
}

export async function generateStaticParams() {
	return await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
}

async function getPost(slug: string) {
	return await sanityFetchLive<BLOG_POST_QUERY_RESULT>({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${ROUTES.blog}/` },
	})
}

const BLOG_POST_QUERY = groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
	...,
	content[]{
		...,
		_type == 'image' => {
			...,
			asset->
		}
	},
	'contentPlainText': pt::text(content),
	'readTime': length(string::split(pt::text(content), ' ')) / 200,
	'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
		style,
		'text': pt::text(@)
	},
	categories[]->{
		_id,
		title,
		slug
	},
	author->{
		name,
		image{
			...,
			asset->
		}
	},
	metadata{
		...,
		image{ ..., asset-> }
	}
}`
