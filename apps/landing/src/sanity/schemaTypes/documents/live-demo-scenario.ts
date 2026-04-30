import { defineArrayMember, defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
	name: 'live-demo-scenario',
	title: 'Live demo scenario',
	type: 'document',
	icon: PlayIcon,
	description: 'A scenario shown in the interactive live demo section on the homepage.',
	fields: [
		defineField({
			name: 'label',
			title: 'Tab label',
			type: 'string',
			description: 'Short label shown on the scenario tab — e.g. "Feature request"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
			description: 'Lower numbers appear first. Use 1, 2, 3.',
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: 'channel',
			title: 'Channel / context label',
			type: 'string',
			description: 'Shown in the thread header — e.g. "#eng-team · invite feature thread"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'msgCount',
			title: 'Message count label',
			type: 'string',
			description: 'Displayed as-is in the thread header — e.g. "18 messages"',
		}),
		defineField({
			name: 'thread',
			title: 'Thread messages',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'message',
					fields: [
						defineField({ name: 'who', title: 'Display name', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'avatar', title: 'Avatar initials (1–2 chars)', type: 'string', validation: (Rule) => Rule.required().max(2) }),
						defineField({ name: 'avatarBg', title: 'Avatar background color (hex)', type: 'string', description: 'e.g. #3D6B4F' }),
						defineField({ name: 'time', title: 'Timestamp label', type: 'string', description: 'e.g. 10:48' }),
						defineField({ name: 'msg', title: 'Message text', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
					],
					preview: {
						select: { title: 'who', subtitle: 'msg' },
						prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle?.slice(0, 80) }),
					},
				}),
			],
		}),
		defineField({
			name: 'acceptanceCriteria',
			title: 'Acceptance criteria',
			type: 'array',
			description: 'Each item becomes one AC bullet in the draft spec.',
			of: [defineArrayMember({ type: 'string' })],
		}),
		defineField({
			name: 'openQuestion',
			title: 'Open question',
			type: 'text',
			rows: 2,
			description: 'The unresolved question flagged during analysis.',
		}),
		defineField({
			name: 'footerMeta',
			title: 'Footer meta text',
			type: 'string',
			description: 'Shown below the spec draft — e.g. "5 AC · 1 open question · awaiting your review"',
		}),
	],
	orderings: [
		{
			name: 'displayOrder',
			title: 'Display order',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			label: 'label',
			order: 'order',
			channel: 'channel',
		},
		prepare: ({ label, order, channel }) => ({
			title: label,
			subtitle: `#${order} · ${channel ?? ''}`,
		}),
	},
})
