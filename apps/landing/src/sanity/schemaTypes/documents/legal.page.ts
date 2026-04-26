import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
	name: 'legal.page',
	title: 'Legal page',
	type: 'document',
	icon: DocumentTextIcon,
	groups: [{ name: 'content', default: true }, { name: 'seo' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (R) => R.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'title' },
			group: 'content',
			validation: (R) => R.required(),
		}),
		defineField({
			name: 'category',
			type: 'string',
			group: 'content',
			options: {
				list: [
					{ title: 'Core', value: 'core' },
					{ title: 'Compliance', value: 'compliance' },
					{ title: 'Trust', value: 'trust' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'lastUpdated',
			title: 'Last updated',
			type: 'date',
			group: 'content',
		}),
		defineField({
			name: 'summary',
			type: 'text',
			rows: 2,
			group: 'content',
			description: 'One-sentence description shown on the legal index page.',
		}),
		defineField({
			name: 'body',
			title: 'Body (portable text)',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'noIndex',
			title: 'No index',
			type: 'boolean',
			initialValue: false,
			group: 'seo',
			description: 'Exclude this page from search engines and the sitemap.',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
		},
	},
})
