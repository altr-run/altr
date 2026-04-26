import { defineArrayMember, defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export default defineType({
	name: 'use-case',
	title: 'Use case',
	type: 'document',
	icon: RocketIcon,
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			title: 'Use case title',
			type: 'string',
			description: 'e.g. "Bug triage to PR", "Feature delivery", "Incident follow-through"',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'headline',
			title: 'Hero headline',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'subhead',
			title: 'Hero subhead',
			type: 'text',
			rows: 3,
			group: 'content',
		}),
		defineField({
			name: 'problem',
			title: 'Problem statement',
			type: 'text',
			rows: 4,
			description: 'The reconstruction tax this use case eliminates',
			group: 'content',
		}),
		defineField({
			name: 'steps',
			title: 'How it works (steps)',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'step', type: 'number', title: 'Step number' }),
						defineField({ name: 'label', type: 'string', title: 'Step label' }),
						defineField({ name: 'body', type: 'text', rows: 2 }),
					],
					preview: { select: { title: 'label', subtitle: 'step' } },
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'tools',
			title: 'Tools in the flow',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'e.g. ["Slack", "Linear", "GitHub", "Notion"]',
			options: { layout: 'tags' },
			group: 'content',
		}),
		defineField({
			name: 'testimonial',
			title: 'Testimonial (optional)',
			type: 'object',
			fields: [
				defineField({ name: 'quote', type: 'text', rows: 3 }),
				defineField({ name: 'name', type: 'string' }),
				defineField({ name: 'title', type: 'string' }),
				defineField({ name: 'company', type: 'string' }),
			],
			group: 'content',
		}),
		defineField({
			name: 'relatedUseCases',
			title: 'Related use cases',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'use-case' }] }],
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
			slug: 'metadata.slug.current',
		},
		prepare: ({ title, slug }) => ({
			title,
			subtitle: slug ? `/use-cases/${slug}` : '(no slug)',
		}),
	},
	orderings: [
		{
			name: 'title',
			title: 'Title A–Z',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
