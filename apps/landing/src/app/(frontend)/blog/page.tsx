import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { BlogPost } from '@/sanity/types'
import PostCard from '@/ui/blog/post-card'
import PostCardHero from '@/ui/blog/post-card-hero'

type ListPost = BlogPost & { readTime?: number }

export const metadata: Metadata = {
	title: 'Blog — Altr',
	description:
		'Writing on AI-native product development, the execution loop, and shipping faster with human + agent teams.',
	openGraph: {
		title: 'Blog — Altr',
		description:
			'Writing on AI-native product development, the execution loop, and shipping faster with human + agent teams.',
	},
	alternates: {
		types: {
			'application/rss+xml': `/${ROUTES.blog}/rss.xml`,
		},
	},
}

export default async function BlogPage() {
	const posts = await sanityFetchLive<ListPost[]>({
		query: BLOG_LIST_QUERY,
		params: { blogDir: `/${ROUTES.blog}/` },
	})

	const [hero, ...rest] = posts ?? []

	return (
		<div className="min-h-screen">
			{/* page header */}
			<div
				className="border-b border-line"
				style={{ background: 'var(--bg-1)' }}
			>
				<div className="inner py-[160px] px-8">
					<p className="over mb-4">
						Journal
					</p>
					<h1 className="heading-2 mb-6">
						Thinking out loud.
					</h1>
					<p className="lede">
						Notes on AI-native product development, the execution loop, and
						what it means to ship with human + agent teams.
					</p>
				</div>
			</div>

			<div className="inner py-24 px-8">
				{/* featured post */}
				{hero && (
					<div className="mb-24">
						<PostCardHero post={hero} />
					</div>
				)}

				{/* post grid */}
				{rest.length > 0 && (
					<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
						{rest.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</div>
				)}

				{!posts?.length && (
					<div className="text-center py-24">
						<p className="font-mono text-[11px] uppercase tracking-widest text-ink-4 mb-4">
							Nothing yet
						</p>
						<p className="font-serif text-[22px] text-ink-3">
							First post coming soon.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

const BLOG_LIST_QUERY = groq`
	*[_type == 'blog.post' && metadata.noIndex != true]|order(publishDate desc){
		_id,
		title,
		publishDate,
		'readTime': length(string::split(pt::text(content), ' ')) / 200,
		categories[]->{
			_id,
			title,
			slug
		},
		author->{
			name,
			image{ ..., asset-> }
		},
		metadata{
			...,
			image{ ..., asset-> },
			'slug': metadata.slug
		},
		'slug': $blogDir + metadata.slug.current
	}
`
