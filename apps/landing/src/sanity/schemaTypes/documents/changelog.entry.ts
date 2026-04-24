import { defineArrayMember, defineField, defineType } from 'sanity'
import { SunIcon } from '@sanity/icons'

export default defineType({
	name: 'changelog.entry',
	title: 'Changelog entry',
	type: 'document',
	icon: SunIcon,
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			title: 'Entry title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'version',
			title: 'Version / release label',
			type: 'string',
			description: 'e.g. "v0.2.1", "April 2025", "Early access wave 3"',
			group: 'content',
		}),
		defineField({
			name: 'releaseDate',
			title: 'Release date',
			type: 'date',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'type',
			title: 'Entry type',
			type: 'string',
			options: {
				list: [
					{ title: 'New', value: 'new' },
					{ title: 'Improved', value: 'improved' },
					{ title: 'Fixed', value: 'fixed' },
					{ title: 'Removed', value: 'removed' },
				],
			},
			group: 'content',
		}),
		defineField({
			name: 'summary',
			title: 'Short summary',
			type: 'text',
			rows: 2,
			group: 'content',
		}),
		defineField({
			name: 'body',
			title: 'Full description',
			type: 'array',
			of: [
				{ type: 'block' },
				defineArrayMember({ type: 'image', options: { hotspot: true, metadata: ['lqip'] } }),
			],
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			version: 'version',
			releaseDate: 'releaseDate',
			type: 'type',
		},
		prepare: ({ title, version, releaseDate, type }) => ({
			title,
			subtitle: [version, releaseDate, type].filter(Boolean).join(' · '),
		}),
	},
	orderings: [
		{
			name: 'releaseDate',
			title: 'Release date (newest first)',
			by: [{ field: 'releaseDate', direction: 'desc' }],
		},
	],
})
