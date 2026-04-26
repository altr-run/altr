import Image from 'next/image'
import { ROUTES } from '@/lib/env'
import { urlFor } from '@/sanity/lib/image'
import type { BlogCategory, BlogPost, Person } from '@/sanity/types'

const { format } = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

function formatDate(date?: string) {
	if (!date) return null
	return format(new Date(date.replace('-', '/')))
}

export default function PostCard({ post }: { post: BlogPost & { readTime?: number } }) {
	const slug = `/${ROUTES.blog}/${post.metadata?.slug?.current}`
	const categories = post.categories as unknown as BlogCategory[]
	const author = post.author as unknown as Person

	return (
		<a
			href={slug}
			className="group flex flex-col gap-4 no-underline text-current"
		>
			{/* thumbnail */}
			<div
				className="aspect-[16/9] rounded-xl overflow-hidden border border-line bg-bg-1 relative"
			>
				{post.metadata?.image ? (
					<img
						src={urlFor(post.metadata.image).width(720).height(405).url()}
						alt={post.title ?? ''}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
					/>
				) : (
					<Image
						src={`/api/og?slug=${ROUTES.blog}/${post.metadata?.slug?.current}&invert=1`}
						alt={post.title ?? ''}
						width={720}
						height={405}
						className="w-full h-full object-cover"
					/>
				)}
			</div>

			{/* meta */}
			<div className="flex flex-col gap-2">
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

				<h2 className="font-serif font-normal text-ink leading-[1.2] group-hover:text-acc transition-colors"
					style={{ fontSize: 'clamp(16px, 1.5vw, 21px)' }}
				>
					{post.title}
				</h2>

				{post.metadata?.description && (
					<p className="font-sans text-[13.5px] text-ink-3 leading-[1.6] line-clamp-2">
						{post.metadata.description}
					</p>
				)}

				<div className="flex items-center gap-3 mt-1">
					{author?.name && (
						<>
							{author.image && (
								<img
									src={urlFor(author.image).width(32).height(32).url()}
									alt={author.name}
									className="w-6 h-6 rounded-full object-cover"
								/>
							)}
							<span className="font-sans text-[12px] text-ink-3">{author.name}</span>
							<span className="text-ink-4">·</span>
						</>
					)}
					{post.publishDate && (
						<span className="font-mono text-[11px] text-ink-4">
							{formatDate(post.publishDate)}
						</span>
					)}
					{post.readTime && (
						<>
							<span className="text-ink-4">·</span>
							<span className="font-mono text-[11px] text-ink-4">
								{Math.ceil(Number(post.readTime))} min read
							</span>
						</>
					)}
				</div>
			</div>
		</a>
	)
}
