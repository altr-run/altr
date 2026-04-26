import Image from 'next/image'
import { ROUTES } from '@/lib/env'
import { urlFor } from '@/sanity/lib/image'
import type { BlogCategory, BlogPost, Person } from '@/sanity/types'

const { format } = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

function formatDate(date?: string) {
	if (!date) return null
	return format(new Date(date.replace('-', '/')))
}

export default function PostCardHero({ post }: { post: BlogPost }) {
	const slug = `/${ROUTES.blog}/${post.metadata?.slug?.current}`
	const categories = post.categories as unknown as BlogCategory[]
	const author = post.author as unknown as Person

	return (
		<a
			href={slug}
			className="group grid md:grid-cols-2 gap-8 items-center no-underline text-current border border-line rounded-2xl overflow-hidden p-0"
			style={{ background: 'var(--bg-1)' }}
		>
			{/* thumbnail */}
			<div className="aspect-[16/9] overflow-hidden relative">
				{post.metadata?.image ? (
					<img
						src={urlFor(post.metadata.image).width(1000).height(563).url()}
						alt={post.title ?? ''}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
					/>
				) : (
					<Image
						src={`/api/og?slug=${ROUTES.blog}/${post.metadata?.slug?.current}&invert=1`}
						alt={post.title ?? ''}
						width={1000}
						height={563}
						className="w-full h-full object-cover"
					/>
				)}
			</div>

			{/* copy */}
			<div className="flex flex-col gap-4 px-8 py-8 md:py-0 md:pr-10">
				{categories?.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{categories.map((c) => (
							<span
								key={c._id}
								className="font-mono text-[10.5px] uppercase tracking-widest text-acc border border-acc/30 rounded-full px-2.5 py-0.5"
							>
								{c.title}
							</span>
						))}
					</div>
				)}

				<h2
					className="font-serif font-normal text-ink leading-[1.15] group-hover:text-acc transition-colors"
					style={{ fontSize: 'clamp(22px, 2.4vw, 36px)', textWrap: 'balance' }}
				>
					{post.title}
				</h2>

				{post.metadata?.description && (
					<p className="font-sans text-[15px] text-ink-3 leading-[1.65] line-clamp-3">
						{post.metadata.description}
					</p>
				)}

				<div className="flex items-center gap-3 mt-2">
					{author?.name && (
						<>
							{author.image && (
								<img
									src={urlFor(author.image).width(40).height(40).url()}
									alt={author.name}
									className="w-7 h-7 rounded-full object-cover"
								/>
							)}
							<span className="font-sans text-[13px] text-ink-3">{author.name}</span>
							<span className="text-ink-4">·</span>
						</>
					)}
					{post.publishDate && (
						<span className="font-mono text-[11px] text-ink-4">
							{formatDate(post.publishDate)}
						</span>
					)}
				</div>
			</div>
		</a>
	)
}
