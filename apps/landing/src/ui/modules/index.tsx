import dynamic from 'next/dynamic'
import { createDataAttribute, stegaClean } from 'next-sanity'
import type {
	BLOG_POST_QUERY_RESULT,
	ModuleAttributes,
	PAGE_QUERY_RESULT,
} from '@/sanity/types'
import Breadcrumbs from './breadcrumbs'
import Callout from './callout'
import CustomHTML from './custom-html'
import HeroSplit from './hero.split'
import Prose from './prose'

const AccordionList = dynamic(() => import('./accordion-list'))
const BlogIndex = dynamic(() => import('./blog/blog-index'))
const BlogPostContent = dynamic(() => import('./blog/blog-post-content'))
const BlogPostList = dynamic(() => import('./blog/blog-post-list'))
const CardList = dynamic(() => import('./card-list'))
const FormModule = dynamic(() => import('./form-module'))
const LogoList = dynamic(() => import('./logo-list'))
const PersonList = dynamic(() => import('./person-list'))
const QuoteList = dynamic(() => import('./quote-list'))
const SearchModule = dynamic(() => import('./search'))
const StatList = dynamic(() => import('./stat-list'))
const StepList = dynamic(() => import('./step-list'))

const MODULES_MAP: Record<string, React.ComponentType<any>> = {
	'accordion-list': AccordionList,
	'blog-index': BlogIndex,
	'blog-post-content': BlogPostContent,
	'blog-post-list': BlogPostList,
	breadcrumbs: Breadcrumbs,
	callout: Callout,
	'card-list': CardList,
	'custom-html': CustomHTML,
	'form-module': FormModule,
	'hero.split': HeroSplit,
	'logo-list': LogoList,
	'person-list': PersonList,
	prose: Prose,
	'quote-list': QuoteList,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
}

export default function ModulesResolver({
	page,
	post,
}: {
	page?: PAGE_QUERY_RESULT
	post?: BLOG_POST_QUERY_RESULT
}) {
	// Safely extract modules depending on which result is provided
	const modules = page?._type === 'page' ? page.modules : post?._type === 'blog.post' ? (post as any).modules : []

	const getModuleSpecificProps = (module: any) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'breadcrumbs':
				return { currentPage: page || post }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module: any) => {
				if (!module || !module._type) return null

				const Module = MODULES_MAP[module._type]

				if (!Module) return null

				const attributes = page
					? {
							id: page._id,
							type: page._type,
							path: `modules[_key == "${module._key}"]`,
						}
					: post
						? {
								id: post._id,
								type: post._type,
								path: `modules[_key == "${module._key}"]`,
							}
						: {}

				return (
					<Module
						{...module}
						{...getModuleSpecificProps(module)}
						data-sanity={createDataAttribute(attributes)}
						key={module._key}
					/>
				)
			})}
		</>
	)
}

export type ModuleProps = { 
	_key?: string
	_type?: string
	attributes?: ModuleAttributes 
}

export function moduleAttributes({ _key, _type, attributes }: any) {
	return {
		id: stegaClean(attributes?.uid) || `module-${_key}`,
		'data-module': _type,
		hidden: attributes?.hidden,
	}
}
