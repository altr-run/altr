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
			className="group grid md:grid-cols-2 gap-10 items-center no-underline text-current border border-line rounded-[32px] overflow-hidden p-0 transition-all hover:shadow-xl hover:border-acc/40"
			style={{ background: 'var(--bg-1)' }}
		>
			{/* thumbnail */}
			<div className="aspect-[16/9] overflow-hidden relative">
				{post.metadata?.image ? (
					<img
						src={urlFor(post.metadata.image).width(1200).height(675).url()}
						alt={post.title ?? ''}
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
					/>
				) : (
					<Image
						src={`/api/og?slug=${ROUTES.blog}/${post.metadata?.slug?.current}&invert=1`}
						alt={post.title ?? ''}
						width={1200}
						height={675}
						className="w-full h-full object-cover"
					/>
				)}
			</div>

			{/* copy */}
			<div className="flex flex-col gap-6 px-10 py-10 md:py-0 md:pr-12">
				{categories?.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{categories.map((c) => (
							<span
								key={c._id}
								className="over text-[10px]"
							>
								{c.title}
							</span>
						))}
					</div>
				)}

				<h2
					className="font-serif font-normal text-ink leading-[1.1] group-hover:text-acc transition-colors"
					style={{ fontSize: 'clamp(28px, 2.8vw, 42px)', textWrap: 'balance' }}
				>
					{post.title}
				</h2>

				{post.metadata?.description && (
					<p className="font-sans text-[17px] text-ink-3 leading-[1.65] line-clamp-3">
						{post.metadata.description}
					</p>
				)}

				<div className="flex items-center gap-4 mt-4">
					{author?.name && (
						<>
							{author.image && (
								<img
									src={urlFor(author.image).width(48).height(48).url()}
									alt={author.name}
									className="w-8 h-8 rounded-full object-cover"
								/>
							)}
							<span className="font-sans text-[14px] text-ink-2">{author.name}</span>
							<span className="text-ink-4">·</span>
						</>
					)}
					{post.publishDate && (
						<span className="font-mono text-[11px] text-ink-4 uppercase tracking-widest">
							{formatDate(post.publishDate)}
						</span>
					)}
				</div>
			</div>
		</a>
	)
}
