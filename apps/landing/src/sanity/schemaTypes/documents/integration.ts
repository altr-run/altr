import { defineArrayMember, defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
	name: 'integration',
	title: 'Integration',
	type: 'document',
	icon: LinkIcon,
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'tool',
			title: 'Tool name',
			type: 'string',
			description: 'e.g. "Slack", "Linear", "GitHub", "Notion"',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Communication', value: 'communication' },
					{ title: 'Project tracking', value: 'project-tracking' },
					{ title: 'Code & version control', value: 'code' },
					{ title: 'Docs & knowledge', value: 'docs' },
					{ title: 'Calls & recordings', value: 'calls' },
					{ title: 'Monitoring & alerts', value: 'monitoring' },
				],
			},
			group: 'content',
		}),
		defineField({
			name: 'domain',
			title: 'Brand domain',
			type: 'string',
			description: 'Root domain for Brandfetch logo fetch — e.g. "slack.com", "linear.app". Leave blank to use the tool\'s Sanity logo image instead.',
			group: 'content',
		}),
		defineField({
			name: 'logo',
			title: 'Tool logo (fallback)',
			type: 'image',
			description: 'Fallback logo shown when no brand domain is set.',
			options: { hotspot: false },
			group: 'content',
		}),
		defineField({
			name: 'headline',
			title: 'Hero headline',
			type: 'string',
			description: 'e.g. "Altr + Slack — the thread stays attached"',
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
			name: 'howItWorks',
			title: 'How the integration works',
			type: 'text',
			rows: 5,
			group: 'content',
		}),
		defineField({
			name: 'signals',
			title: 'Signals Altr reads from this tool',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'signal', type: 'string', title: 'Signal' }),
						defineField({ name: 'description', type: 'string' }),
					],
					preview: { select: { title: 'signal' } },
				}),
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
			tool: 'tool',
			category: 'category',
			slug: 'metadata.slug.current',
			logo: 'logo',
		},
		prepare: ({ tool, category, slug, logo }) => ({
			title: `Altr + ${tool}`,
			subtitle: `${category ?? ''} · ${slug ? `/integrations/${slug}` : '(no slug)'}`,
			media: logo,
		}),
	},
	orderings: [
		{
			name: 'tool',
			title: 'Tool A–Z',
			by: [{ field: 'tool', direction: 'asc' }],
		},
	],
})
