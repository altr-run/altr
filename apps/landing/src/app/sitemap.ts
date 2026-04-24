import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'

export const dynamic = 'force-dynamic'

export default async function (): Promise<MetadataRoute.Sitemap> {
	const data = await sanityFetchLive<{
		pages: MetadataRoute.Sitemap
		posts: MetadataRoute.Sitemap
		comparePages: MetadataRoute.Sitemap
		useCases: MetadataRoute.Sitemap
		integrations: MetadataRoute.Sitemap
		changelog: MetadataRoute.Sitemap
	}>({
		query: groq`{
			'pages': *[
				_type == 'page'
				&& defined(metadata.slug.current)
				&& !(metadata.slug.current in ['404'])
				&& metadata.noIndex != true
			]|order(metadata.slug.current != 'index', metadata.slug.current){
				'url': $baseUrl + select(
					metadata.slug.current == 'index' => '',
					'/' + metadata.slug.current
				),
				'lastModified': _updatedAt,
				'priority': select(
					metadata.slug.current == 'index' => 1,
					0.5
				)
			},
			'posts': *[
				_type == 'blog.post'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(publishDate desc){
				'url': $baseUrl + '/' + $blogDir + '/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.4
			},
			'comparePages': *[
				_type == 'compare.page'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(competitor asc){
				'url': $baseUrl + '/' + $compareDir + '/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.7
			},
			'useCases': *[
				_type == 'use-case'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(title asc){
				'url': $baseUrl + '/' + $useCasesDir + '/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.6
			},
			'integrations': *[
				_type == 'integration'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(tool asc){
				'url': $baseUrl + '/' + $integrationsDir + '/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.5
			},
			'changelog': *[_type == 'changelog.entry'] | order(releaseDate desc)[0]{
				'url': $baseUrl + '/' + $changelogDir,
				'lastModified': _updatedAt,
				'priority': 0.5
			}
		}`,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
			blogDir: ROUTES.blog,
			compareDir: ROUTES.compare,
			useCasesDir: ROUTES.useCases,
			integrationsDir: ROUTES.integrations,
			changelogDir: ROUTES.changelog,
		},
	})

	return Object.values(data).flat().filter(Boolean)
}
