import { defineArrayMember, defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export default defineType({
	name: 'compare.page',
	title: 'Compare page',
	type: 'document',
	icon: ComposeIcon,
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'competitor',
			title: 'Competitor name',
			type: 'string',
			description: 'e.g. "Cursor", "Devin", "ClickUp Codegen"',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'headline',
			title: 'Hero headline',
			type: 'string',
			description: 'e.g. "Altr vs Cursor — context that survives the handoff"',
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
			name: 'painPoints',
			title: 'Pain points (3 cards)',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'title', type: 'string' }),
						defineField({ name: 'body', type: 'text', rows: 2 }),
					],
					preview: { select: { title: 'title' } },
				}),
			],
			validation: (Rule) => Rule.max(3),
			group: 'content',
		}),
		defineField({
			name: 'featureTable',
			title: 'Feature comparison table',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'feature', type: 'string', title: 'Feature label' }),
						defineField({ name: 'altr', type: 'boolean', title: 'Altr has it', initialValue: true }),
						defineField({ name: 'them', type: 'boolean', title: 'Competitor has it', initialValue: false }),
						defineField({ name: 'altrNote', type: 'string', title: 'Altr note (optional)' }),
						defineField({ name: 'themNote', type: 'string', title: 'Competitor note (optional)' }),
					],
					preview: { select: { title: 'feature', altr: 'altr', them: 'them' } },
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'counterParagraph',
			title: 'Counter-positioning paragraph',
			type: 'text',
			rows: 5,
			description: 'The "why Altr is fundamentally different" block',
			group: 'content',
		}),
		defineField({
			name: 'ctaLabel',
			title: 'CTA button label',
			type: 'string',
			initialValue: 'Get early access',
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
			competitor: 'competitor',
			slug: 'metadata.slug.current',
		},
		prepare: ({ competitor, slug }) => ({
			title: `Altr vs ${competitor}`,
			subtitle: slug ? `/compare/${slug}` : '(no slug)',
		}),
	},
	orderings: [
		{
			name: 'competitor',
			title: 'Competitor A–Z',
			by: [{ field: 'competitor', direction: 'asc' }],
		},
	],
})
