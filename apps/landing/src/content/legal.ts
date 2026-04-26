// Legal content data layer — typed map for all 12 legal/compliance pages.
// These serve as fallbacks when Sanity returns null, and for generateStaticParams.

export type LegalSection = {
	heading: string
	body: string[] // each string is one paragraph
	list?: string[] // optional bullet list items
}

export type LegalPageContent = {
	title: string
	category: 'core' | 'compliance' | 'trust'
	lastUpdated: string // ISO date "YYYY-MM-DD"
	summary: string // 1-sentence description for index page
	sections: LegalSection[]
}

export const LEGAL_PAGES: Record<string, LegalPageContent> = {
	privacy: {
		title: 'Privacy Policy',
		category: 'core',
		lastUpdated: '2026-04-24',
		summary: 'How Altr collects, uses, and protects your data.',
		sections: [
			{
				heading: 'Overview',
				body: [
					'Altr Labs, Inc. ("Altr", "we", "us", or "our") is a Delaware corporation. We build Altr, a Mac-native AI workspace that runs locally on your device. This Privacy Policy describes how we collect, use, disclose, and protect information about you when you use our application, website at altr.run, and integration server.',
					'We take privacy seriously. The short version: your workspace data — specs, tickets, agent sessions, and LLM API keys — stays on your device. Our cloud infrastructure only sees what is strictly necessary to route integration events from Slack, GitHub, Linear, and Notion.',
				],
			},
			{
				heading: 'What we collect',
				body: [
					'We collect different types of information depending on how you interact with Altr.',
				],
				list: [
					'Email address — when you sign up for early access or contact us. Used to send onboarding, product updates, and replies to your messages.',
					'Product analytics — via PostHog (opt-out available on first launch). We collect anonymous events like feature usage, session length, and navigation paths. We do not collect the content of your specs, tickets, or agent messages.',
					'Error reports — via Sentry. When the app crashes or encounters an unhandled error, a sanitized stack trace is sent. We strip any personally identifiable content before transmission.',
					'Integration event data — if you connect Slack, GitHub, Linear, or Notion, events from those tools transit our integration server temporarily during routing. We do not store the full content of these events beyond what is needed to route them to your device.',
					'Device and app metadata — OS version, app version, and crash context, used solely for debugging and support.',
				],
			},
			{
				heading: 'What stays on your device',
				body: [
					'Altr is built local-first. The following data never leaves your machine and is never sent to our servers:',
				],
				list: [
					'Your SQLite workspace database — all specs, tickets, agent session history, and execution trails.',
					'Your LLM API keys (Anthropic, OpenAI, or other providers) — stored in the macOS keychain, not in any database or network request.',
					'The content of your specifications, requirements documents, and code.',
					'Any personally identifiable information about your team members or customers referenced in your workspace.',
				],
			},
			{
				heading: 'How we use your information',
				body: [
					'We use the information we collect to operate and improve Altr, respond to your support requests, send product updates you have opted into, diagnose errors and crashes, and comply with our legal obligations.',
					'We do not sell your personal information. We do not share your data with advertisers. We do not use your data to train AI models.',
				],
			},
			{
				heading: 'Data retention',
				body: [
					'Email addresses are retained until you ask us to delete them. Analytics events are retained for 12 months in PostHog. Error reports are retained for 90 days in Sentry. Integration event transit logs are deleted within 24 hours of routing.',
					'To request deletion of any data we hold about you, email privacy@altr.run. We will respond within 30 days.',
				],
			},
			{
				heading: 'Your rights',
				body: [
					'Depending on your jurisdiction, you may have the right to access, correct, port, or delete personal data we hold about you. You may also have the right to object to or restrict certain processing.',
					'To exercise any of these rights, email privacy@altr.run with your request. We will respond within 30 days and may ask you to verify your identity before fulfilling the request.',
					'If you are in the European Economic Area, you have rights under the GDPR. If you are in California, you have rights under the CCPA. We honor these rights regardless of where you are located.',
				],
			},
			{
				heading: 'Cookies',
				body: [
					'Our website (altr.run) uses strictly necessary cookies for session management and a PostHog analytics cookie (opt-out available). We do not use advertising or tracking cookies.',
					'For detailed cookie information, see our Cookie Policy.',
				],
			},
			{
				heading: 'Contact',
				body: [
					'Altr Labs, Inc. is the data controller for information collected through our services. If you have questions about this policy, email privacy@altr.run.',
					'We may update this policy from time to time. Material changes will be announced via the in-app notification system or email.',
				],
			},
		],
	},

	terms: {
		title: 'Terms of Service',
		category: 'core',
		lastUpdated: '2026-04-24',
		summary: 'The legal agreement governing your use of Altr.',
		sections: [
			{
				heading: 'Agreement',
				body: [
					'These Terms of Service ("Terms") govern your access to and use of the Altr application, website, and integration services provided by Altr Labs, Inc. ("Altr"), a Delaware corporation. By downloading the application, signing up for early access, or using any Altr service, you agree to these Terms.',
					'If you are using Altr on behalf of an organization, you represent that you have the authority to bind that organization to these Terms. In that case, "you" refers to both you and your organization.',
				],
			},
			{
				heading: 'Early access and pilot nature',
				body: [
					'Altr is currently in pilot and early access. The product is under active development. Features may change, APIs may break, and data formats may evolve between releases. We will give advance notice of breaking changes where possible.',
					'During the pilot period, we may impose usage limits, invite you to join or exit the program at our discretion, and make decisions about features and pricing that we announce in advance. This is a genuine early product, not a marketing exercise.',
				],
			},
			{
				heading: 'Your account and responsibilities',
				body: [
					'You are responsible for maintaining the security of your account and API keys. Your Anthropic and OpenAI keys are stored in your macOS keychain and are your sole responsibility — Altr never sees or stores them.',
					'You agree not to use Altr to process data you do not have the right to use, to circumvent access controls in third-party systems, to generate content that violates applicable law, or to attempt to reverse-engineer or tamper with the application.',
				],
			},
			{
				heading: 'Agent behavior and BYOK responsibility',
				body: [
					'Altr includes AI agent features (Pax and Eng) that take actions on your behalf, including writing specifications, creating tickets, and opening pull requests. You are responsible for reviewing agent output before it reaches external systems.',
					'Because Altr uses a bring-your-own-key (BYOK) model, all LLM API calls are made from your device using your provider keys. You are responsible for costs incurred with your LLM provider and for complying with their terms of service. Altr does not intermediate or mark up these costs.',
				],
			},
			{
				heading: 'Intellectual property',
				body: [
					'You retain ownership of all content you create using Altr, including specifications, tickets, and code. Altr does not claim ownership over your work product.',
					'The Altr application, website, and brand are owned by Altr Labs, Inc. You may not copy, modify, or distribute our software except as permitted by applicable law or a separate license agreement.',
				],
			},
			{
				heading: 'No warranty',
				body: [
					'Altr is provided "as is" and "as available" without warranty of any kind. We do not warrant that the application will be error-free, uninterrupted, or that it will meet your requirements.',
					'To the extent permitted by law, Altr disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
				],
			},
			{
				heading: 'Limitation of liability',
				body: [
					'To the maximum extent permitted by law, Altr and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, even if we have been advised of the possibility of such damages.',
					'Our total liability for any claim arising from these Terms or your use of Altr shall not exceed the greater of $100 or the amount you paid us in the 12 months preceding the claim.',
				],
			},
			{
				heading: 'Governing law and disputes',
				body: [
					'These Terms are governed by the laws of the State of Delaware, without regard to its conflict of law principles. Any disputes arising from these Terms shall be resolved in the state or federal courts located in Delaware, and you consent to personal jurisdiction there.',
					'To initiate a dispute, email legal@altr.run with a description of the issue. We will make a good-faith effort to resolve it within 30 days before either party pursues formal proceedings.',
				],
			},
		],
	},

	security: {
		title: 'Security',
		category: 'core',
		lastUpdated: '2026-04-24',
		summary: "How Altr protects your data across the device, cloud integration layer, and LLM providers.",
		sections: [
			{
				heading: 'Architecture overview',
				body: [
					'Altr has three layers, and understanding which data lives where is the foundation of our security model.',
				],
				list: [
					'Device layer — your Mac running the Altr app. All workspace data (specs, tickets, agent sessions, execution trails) lives in a local SQLite database. LLM API keys are stored in the macOS keychain. This layer is entirely under your control.',
					'Cloud integration layer — Altr\'s integration server (self-operated, US-based). This handles OAuth flows for Slack, GitHub, Linear, and Notion, and routes webhook events to your device. Integration event data transits this layer temporarily and is not stored beyond routing.',
					'LLM provider layer — Anthropic, OpenAI, or other providers you configure. API calls go directly from your device to your LLM provider using your own key. These calls never route through Altr\'s servers.',
				],
			},
			{
				heading: 'What never leaves your device',
				body: [
					'The following data is never transmitted to Altr servers under any circumstances:',
				],
				list: [
					'Your LLM API keys (Anthropic, OpenAI, etc.) — stored in the macOS keychain only.',
					'Your SQLite workspace database — specs, tickets, agent sessions, and execution trails.',
					'The content of your code, specifications, or requirements documents.',
					'Any data you choose not to connect via integrations.',
				],
			},
			{
				heading: 'Encryption',
				body: [
					'All data in transit between the Altr app and our integration server is encrypted with TLS 1.2 or higher. All data in transit between the Altr app and LLM providers is encrypted by those providers (TLS 1.3).',
					'Data at rest on our integration server (OAuth tokens, routing metadata) is encrypted using AES-256 at the storage level. Your local SQLite database is encrypted at the filesystem level by macOS FileVault when enabled — we recommend enabling it.',
				],
			},
			{
				heading: 'Authentication and access control',
				body: [
					'OAuth tokens for connected integrations (Slack, GitHub, Linear, Notion) are stored encrypted on our integration server and scoped to the minimum permissions required for each integration to function. Tokens are rotated on re-authentication.',
					'Access to Altr\'s integration server infrastructure is limited to employees who require it, with MFA enforced on all accounts.',
				],
			},
			{
				heading: 'SOC 2 in progress',
				body: [
					'We are pursuing SOC 2 Type II certification. We have implemented the organizational and technical controls required and have engaged an auditor. We expect to complete the audit in 2026. Existing pilot customers may request a summary of controls in the meantime by emailing security@altr.run.',
				],
			},
			{
				heading: 'Incident response',
				body: [
					'We monitor our integration server for anomalous activity and have documented incident response procedures. In the event of a security incident affecting your data, we will notify affected users within 72 hours of becoming aware of the incident.',
					'To report a security issue, see our Vulnerability Disclosure Policy or email security@altr.run.',
				],
			},
		],
	},

	'acceptable-use': {
		title: 'Acceptable Use Policy',
		category: 'compliance',
		lastUpdated: '2026-04-24',
		summary: 'What you may and may not do with Altr.',
		sections: [
			{
				heading: 'Purpose',
				body: [
					'This Acceptable Use Policy ("AUP") describes the rules for using Altr\'s application and services. It applies to all users, including those using Altr during the pilot period and early access program.',
					'Violations of this policy may result in suspension or termination of your access to Altr. We may update this policy from time to time — continued use of the service constitutes acceptance of the updated policy.',
				],
			},
			{
				heading: 'Permitted uses',
				body: [
					'Altr is designed for software product teams. Permitted uses include using Altr to capture and structure product requirements, generate technical specifications, create and manage implementation tickets, automate code generation and pull request creation, and integrate with your existing development tools.',
				],
			},
			{
				heading: 'Prohibited uses',
				body: [
					'You may not use Altr for any of the following:',
				],
				list: [
					'Generating, distributing, or facilitating the distribution of content that is illegal, harmful, threatening, abusive, harassing, defamatory, or discriminatory.',
					'Attempting to gain unauthorized access to Altr\'s systems, other users\' data, or third-party systems connected through Altr\'s integrations.',
					'Using Altr to send spam, phishing messages, or other unsolicited communications.',
					'Circumventing rate limits, usage caps, or authentication controls on Altr or any connected third-party service.',
					'Using agent features (Pax, Eng) to take automated actions in third-party systems without the appropriate permissions and in violation of those systems\' terms of service.',
					'Reverse engineering, decompiling, or otherwise attempting to extract source code from the Altr application.',
					'Sublicensing, reselling, or redistributing access to Altr without our express written permission.',
					'Processing personal data in ways that violate applicable privacy laws, including GDPR and CCPA.',
				],
			},
			{
				heading: 'Agent-generated actions',
				body: [
					'Altr\'s agent features (Pax and Eng) can take automated actions such as opening pull requests, creating tickets, and posting messages. You are responsible for all actions taken by agents on your behalf, including ensuring those actions comply with this AUP and the terms of service of connected tools.',
					'You should configure the autonomy level appropriate for your workflow. We recommend starting in copilot mode (human review required before external actions) until you are confident in the agent\'s output quality.',
				],
			},
			{
				heading: 'Reporting violations',
				body: [
					'If you become aware of a violation of this policy, or if you believe Altr is being used in a manner that harms you or others, please email legal@altr.run. We investigate all reports and respond within 5 business days.',
				],
			},
		],
	},

	'data-processing': {
		title: 'Data Processing Agreement',
		category: 'compliance',
		lastUpdated: '2026-04-24',
		summary: 'Terms governing Altr\'s processing of personal data on your behalf, including GDPR compliance.',
		sections: [
			{
				heading: 'Purpose and scope',
				body: [
					'This Data Processing Agreement ("DPA") supplements our Terms of Service and applies where Altr processes personal data on your behalf in connection with integration services (Slack, GitHub, Linear, Notion event routing). It is intended to satisfy the requirements of Article 28 of the GDPR and similar regulations.',
					'Under this DPA, you are the data controller and Altr is the data processor for personal data that transits our integration server. For data collected directly from you (email, analytics), Altr is the data controller under our Privacy Policy.',
				],
			},
			{
				heading: 'Data processed',
				body: [
					'As a data processor, Altr processes only the personal data that transits our integration server as part of routing webhook events from your connected tools to your device. This may include names, usernames, email addresses, and message content from Slack, GitHub, Linear, or Notion.',
					'We process this data solely to route events to your device. We do not analyze, mine, sell, or use this data for any purpose other than providing the integration routing service.',
				],
			},
			{
				heading: 'Processing instructions',
				body: [
					'Altr processes personal data only on your documented instructions. By connecting an integration, you instruct Altr to route events from that integration to your device. You may withdraw these instructions at any time by disconnecting the integration in the Altr application.',
					'We will inform you if we believe any instruction infringes applicable data protection law, and we will not process personal data in a manner inconsistent with your instructions.',
				],
			},
			{
				heading: 'Security measures',
				body: [
					'Altr implements appropriate technical and organizational measures to protect personal data against unauthorized access, disclosure, alteration, or destruction. These include TLS encryption for all data in transit, AES-256 encryption for data at rest on our integration server, and access controls limiting who can access integration infrastructure.',
					'A full description of our security measures is available in our Security page.',
				],
			},
			{
				heading: 'Sub-processors',
				body: [
					'Altr uses a limited number of sub-processors in connection with integration services. Our current sub-processor list is maintained on the Sub-processors page. We will notify you of changes to the sub-processor list with 30 days advance notice, giving you an opportunity to object.',
				],
			},
			{
				heading: 'Data subject rights and assistance',
				body: [
					'We will assist you in responding to data subject rights requests (access, deletion, portability, etc.) relating to personal data we process on your behalf. Given that integration event data is retained for less than 24 hours, most requests can be addressed by confirming that no data is retained.',
					'To submit a data subject rights request related to data processed under this DPA, email privacy@altr.run.',
				],
			},
			{
				heading: 'Retention and deletion',
				body: [
					'Integration event transit data is deleted within 24 hours of routing. OAuth tokens used for integration authentication are retained until you disconnect the integration. Upon termination of your Altr account, we will delete all integration data within 30 days.',
					'You may request early deletion of any data we hold by emailing privacy@altr.run.',
				],
			},
		],
	},

	subprocessors: {
		title: 'Sub-processors',
		category: 'compliance',
		lastUpdated: '2026-04-24',
		summary: 'Third-party services Altr uses to deliver its integration services.',
		sections: [
			{
				heading: 'Overview',
				body: [
					'This page lists the sub-processors Altr Labs, Inc. uses in connection with providing its services. A sub-processor is a third-party company or individual that Altr has authorized to process personal data on Altr\'s behalf.',
					'We maintain a minimal sub-processor list. We do not use data brokers, ad networks, or any third party that would use your data for purposes beyond providing the Altr service.',
				],
			},
			{
				heading: 'Integration server (self-operated)',
				body: [
					'Altr operates its own integration server infrastructure in the United States. This server handles OAuth authentication flows and webhook event routing for connected integrations (Slack, GitHub, Linear, Notion). The integration server is operated entirely by Altr Labs, Inc. and is not a third-party sub-processor.',
				],
			},
			{
				heading: 'Current sub-processors',
				body: [
					'The following third parties process personal data in connection with Altr services:',
				],
				list: [
					'Sentry (Functional Software, Inc.) — Error tracking and crash reporting. Processes sanitized stack traces and device metadata. Data retained for 90 days. US-based, with EU data residency options. Privacy policy: sentry.io/privacy.',
					'PostHog, Inc. — Product analytics. Processes anonymous usage events. PostHog is opt-out — you can disable it on first launch. Data retained for 12 months. US-based, with EU data residency options. Privacy policy: posthog.com/privacy.',
					'Vercel, Inc. — Hosting for the Altr landing page (altr.run). Processes standard web server logs including IP addresses. Data retained per Vercel\'s standard retention policy. US-based. Privacy policy: vercel.com/legal/privacy-policy.',
				],
			},
			{
				heading: 'What our sub-processors do not receive',
				body: [
					'Our sub-processors do not receive workspace data (specs, tickets, agent sessions), LLM API keys, the content of your code repositories, or integration event content. Sentry receives sanitized error reports only. PostHog receives anonymous usage events only.',
				],
			},
			{
				heading: 'Changes to this list',
				body: [
					'We will provide 30 days advance notice before adding a new sub-processor. Notification will be sent to the email address associated with your Altr account.',
					'You may object to the addition of a new sub-processor within the 30-day notice period by emailing legal@altr.run. If we cannot accommodate your objection, you may terminate your use of Altr without penalty.',
				],
			},
		],
	},

	'cookie-policy': {
		title: 'Cookie Policy',
		category: 'compliance',
		lastUpdated: '2026-04-24',
		summary: 'How the Altr website uses cookies and similar tracking technologies.',
		sections: [
			{
				heading: 'Overview',
				body: [
					'This Cookie Policy explains how Altr Labs, Inc. uses cookies and similar tracking technologies on the Altr website (altr.run). It does not cover the Altr desktop application, which does not use browser cookies.',
				],
			},
			{
				heading: 'What are cookies?',
				body: [
					'Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work, remember your preferences, and provide information to website owners.',
					'Altr uses cookies sparingly and only for the purposes described in this policy.',
				],
			},
			{
				heading: 'Cookies we use',
				body: [
					'The Altr website uses the following categories of cookies:',
				],
				list: [
					'Strictly necessary — Session management cookies required for the website to function. These cannot be disabled. No personal information is stored in these cookies.',
					'Analytics (PostHog) — We use PostHog to understand how visitors use the website. PostHog sets a cookie to identify returning visitors anonymously. You can opt out of PostHog analytics by clicking the opt-out link in the website footer or by emailing privacy@altr.run.',
				],
			},
			{
				heading: 'Cookies we do not use',
				body: [
					'We do not use advertising cookies, retargeting cookies, social media tracking pixels, or any cookie that shares data with advertising networks. We do not use Google Analytics, Meta Pixel, LinkedIn Insight Tag, or any similar advertising infrastructure.',
				],
			},
			{
				heading: 'Managing cookies',
				body: [
					'You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when cookies are set. Note that disabling strictly necessary cookies may affect website functionality.',
					'To opt out of PostHog analytics specifically, email privacy@altr.run or use your browser\'s "Do Not Track" setting (we honor it).',
				],
			},
			{
				heading: 'Changes to this policy',
				body: [
					'We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date. If we make material changes, we will notify you via email or an in-app notice.',
				],
			},
		],
	},

	'ai-policy': {
		title: 'AI Policy',
		category: 'compliance',
		lastUpdated: '2026-04-24',
		summary: "How Altr's AI agents work, what they can do, and how we handle AI-generated content.",
		sections: [
			{
				heading: 'Overview',
				body: [
					'Altr includes AI agent features — Pax (product manager agent) and Eng (engineering agent). This policy describes how these agents work, what they can and cannot do, and your responsibilities when using them.',
					'We believe in transparency about AI capabilities and limitations. Agents are powerful tools, but they make mistakes. Human review of agent output is not optional — it\'s a core part of how Altr is designed to be used.',
				],
			},
			{
				heading: 'How AI agents work',
				body: [
					'Pax and Eng are AI agents that run on your device and use your own LLM API keys (Anthropic\'s Claude, or other providers you configure) to generate output. Because Altr uses a bring-your-own-key model, LLM API calls go directly from your device to your LLM provider — Altr\'s servers do not see the content of your prompts or completions.',
					'Agents can read data from your Altr workspace (specs, tickets, execution trails) and from connected integrations (Slack threads, GitHub issues, Linear tickets). They write output back into your workspace as new or updated nodes in the execution graph.',
				],
			},
			{
				heading: 'What agents can do',
				body: [
					'With your authorization, Altr\'s agents can perform the following actions:',
				],
				list: [
					'Pax: write and edit specifications in your workspace, create and update tickets, structure requirements from Slack threads or other sources, and generate acceptance criteria.',
					'Eng: create git worktrees, write and modify code, run builds and tests, open pull requests on GitHub, and stream progress back to your workspace.',
					'Both agents: read from connected integrations (Slack, GitHub, Linear, Notion) to gather context for their work.',
				],
			},
			{
				heading: 'Human review and autonomy controls',
				body: [
					'Every ticket in Altr has an autonomy setting: copilot (human review required before external actions), autopilot (agent works autonomously within configured limits), or human-only (no agent involvement). The default is copilot.',
					'We strongly recommend starting in copilot mode. Autopilot mode should only be enabled for tasks where you have high confidence in the acceptance criteria and the scope of change is bounded. Altr will not let an agent open a pull request without you having had the opportunity to review the spec.',
				],
			},
			{
				heading: 'AI-generated content and accuracy',
				body: [
					'AI agents can make mistakes. Specifications, tickets, and code generated by Pax or Eng may contain errors, omissions, or misinterpretations of your requirements. You are responsible for reviewing and approving agent output before it is published, committed, or sent to external systems.',
					'Altr does not warrant the accuracy, completeness, or fitness for purpose of any AI-generated content. By using agent features, you acknowledge that agent output requires human review.',
				],
			},
			{
				heading: 'LLM provider terms',
				body: [
					'Because Altr uses a BYOK model, your use of LLM features is subject to the terms of service of your LLM provider (Anthropic, OpenAI, etc.). You are responsible for ensuring your use of agent features complies with those terms, including restrictions on automated or bulk usage.',
					'Altr does not train models on your data, and we do not share your prompts or completions with any party other than the LLM provider you have configured.',
				],
			},
			{
				heading: 'Feedback and model improvement',
				body: [
					'We do not use your agent interactions to improve AI models without your explicit consent. If we introduce a feedback mechanism that contributes to model improvement, it will be clearly labeled as opt-in.',
				],
			},
		],
	},

	soc2: {
		title: 'SOC 2 Compliance',
		category: 'trust',
		lastUpdated: '2026-04-24',
		summary: 'Our progress toward SOC 2 Type II certification and the controls we have in place today.',
		sections: [
			{
				heading: 'Current status',
				body: [
					'Altr Labs, Inc. is actively pursuing SOC 2 Type II certification. We have implemented the organizational and technical controls required and are working with an independent auditor. We expect to complete the audit and receive the report in 2026.',
					'We share this status openly because we believe transparency matters more than waiting until the badge is complete. If you need our current control documentation for a vendor review, email security@altr.run.',
				],
			},
			{
				heading: 'Trust service criteria we are addressing',
				body: [
					'SOC 2 Type II covers five trust service criteria. We are addressing all five:',
				],
				list: [
					'Security — access controls, encryption, vulnerability management, and incident response. See our Security page for details.',
					'Availability — uptime monitoring for our integration server, incident response procedures, and documented recovery objectives.',
					'Processing integrity — ensuring that our integration event routing is complete, accurate, and authorized.',
					'Confidentiality — controls to protect confidential information, including customer data and business-sensitive information.',
					'Privacy — controls aligned with our Privacy Policy, including data minimization and retention practices.',
				],
			},
			{
				heading: 'Key controls in place today',
				body: [
					'Regardless of audit status, we have implemented the following controls:',
				],
				list: [
					'Encryption in transit (TLS 1.2+) for all communication between the Altr app and our integration server.',
					'Encryption at rest (AES-256) for data on our integration server.',
					'Multi-factor authentication required for all employee access to production systems.',
					'Least-privilege access — employees are granted only the permissions they need for their role.',
					'Audit logging for all access to production infrastructure.',
					'Documented incident response procedures with defined escalation paths.',
					'Regular dependency updates and vulnerability scanning for the Altr application.',
					'Background checks for all employees with access to production systems.',
				],
			},
			{
				heading: 'Requesting documentation',
				body: [
					'Pilot customers and enterprise prospects may request a summary of our current controls, our penetration test report (when available), or a questionnaire completion. Email security@altr.run with your request and we will respond within 5 business days.',
					'Once the SOC 2 Type II report is complete, it will be available to customers under NDA.',
				],
			},
		],
	},

	'vulnerability-disclosure': {
		title: 'Vulnerability Disclosure Policy',
		category: 'trust',
		lastUpdated: '2026-04-24',
		summary: 'How to report security vulnerabilities in Altr and what to expect in response.',
		sections: [
			{
				heading: 'Our commitment',
				body: [
					'Altr Labs, Inc. takes the security of our application and services seriously. We welcome reports from security researchers and users who discover potential vulnerabilities. We commit to working with you in good faith to understand and address reported issues promptly.',
					'We will not take legal action against researchers who discover and report vulnerabilities in accordance with this policy. We will keep you informed of our progress as we investigate and address reported issues.',
				],
			},
			{
				heading: 'Scope',
				body: [
					'This policy applies to the following:',
				],
				list: [
					'The Altr desktop application (Mac, distributed via our website and direct links).',
					'The Altr integration server (altr.run APIs used by the desktop app).',
					'The Altr website (altr.run and subdomains).',
				],
			},
			{
				heading: 'Out of scope',
				body: [
					'The following are out of scope for this policy:',
				],
				list: [
					'Vulnerabilities in third-party services we use (Sentry, PostHog, Vercel) — report these to those vendors directly.',
					'Vulnerabilities in the LLM providers you connect to Altr (Anthropic, OpenAI, etc.).',
					'Social engineering attacks against Altr employees.',
					'Physical attacks against Altr infrastructure or personnel.',
					'Denial of service attacks of any kind.',
					'Automated vulnerability scanning without prior permission.',
				],
			},
			{
				heading: 'How to report',
				body: [
					'To report a vulnerability, email security@altr.run with:',
				],
				list: [
					'A description of the vulnerability and the potential impact.',
					'Step-by-step instructions to reproduce the issue.',
					'Any proof-of-concept code, screenshots, or other supporting material.',
					'Your name and contact information (optional, if you prefer to report anonymously).',
				],
			},
			{
				heading: 'Our response',
				body: [
					'We will acknowledge your report within 2 business days. We will provide an initial assessment of the severity and scope within 5 business days. We will keep you updated as we investigate and resolve the issue.',
					'We aim to resolve critical vulnerabilities within 7 days, high severity within 30 days, and lower severity within 90 days. We will notify you when the issue is resolved.',
				],
			},
			{
				heading: 'Safe harbor',
				body: [
					'If you follow this policy when reporting a vulnerability, we will not pursue civil or criminal action against you. We will not refer you to law enforcement. We ask that you act in good faith: do not access data beyond what is necessary to demonstrate the vulnerability, and do not disclose the vulnerability publicly until we have had reasonable time to address it.',
				],
			},
		],
	},

	sla: {
		title: 'Service Level Agreement',
		category: 'trust',
		lastUpdated: '2026-04-24',
		summary: "Uptime commitments and support response times for Altr's integration services.",
		sections: [
			{
				heading: 'Scope',
				body: [
					'This Service Level Agreement ("SLA") describes our uptime commitments and support response times for Altr\'s integration server — the cloud component that handles OAuth authentication and webhook event routing for connected tools (Slack, GitHub, Linear, Notion).',
					'The Altr desktop application itself is local-first and offline-capable. Workspace data (specs, tickets, agent sessions) does not depend on integration server availability. Integration event routing and OAuth authentication are the only services subject to this SLA.',
				],
			},
			{
				heading: 'Uptime commitment',
				body: [
					'We target 99.5% monthly uptime for the integration server. This equates to no more than approximately 3.65 hours of downtime per month.',
					'During the current pilot period, we do not offer financial SLA credits. We will notify affected users of planned maintenance at least 48 hours in advance, and we will communicate unplanned outages via status.altr.run (coming soon) and email.',
				],
			},
			{
				heading: 'Exclusions',
				body: [
					'The following are excluded from uptime calculations:',
				],
				list: [
					'Scheduled maintenance windows (announced 48 hours in advance).',
					'Outages caused by third-party services outside our control (Slack, GitHub, Linear, Notion, or cloud infrastructure providers).',
					'Outages caused by your actions or your use of Altr in a manner inconsistent with the Acceptable Use Policy.',
					'Force majeure events (natural disasters, war, government actions, etc.).',
				],
			},
			{
				heading: 'Support response times',
				body: [
					'During the pilot period, support is provided via email to support@altr.run. We target the following response times:',
				],
				list: [
					'Critical (integration down, data loss risk): response within 4 hours during business hours (9am-6pm US Eastern, Monday-Friday).',
					'High (integration impaired, significant functionality affected): response within 1 business day.',
					'Normal (questions, minor issues): response within 2 business days.',
				],
			},
			{
				heading: 'Changes to this SLA',
				body: [
					'We will provide 30 days advance notice of any reduction in our uptime commitment or support response times. We may improve these commitments without notice.',
					'As Altr graduates from pilot to general availability, we expect to introduce tiered SLAs with financial credits. We will update this page and notify customers in advance.',
				],
			},
		],
	},

	'data-retention': {
		title: 'Data Retention Policy',
		category: 'trust',
		lastUpdated: '2026-04-24',
		summary: 'How long Altr retains different categories of data and how to request deletion.',
		sections: [
			{
				heading: 'Overview',
				body: [
					'This Data Retention Policy describes how long Altr Labs, Inc. retains different categories of data. Altr is a local-first application — the majority of your data (workspace contents, specs, tickets, agent sessions) is stored on your device and is never transmitted to our servers. This policy focuses on the data we do hold.',
				],
			},
			{
				heading: 'Data on your device',
				body: [
					'Your Altr workspace database (SQLite) is stored at ~/Library/Application Support/run.altr.desktop/altr.db on your Mac. Altr does not control or limit the retention of this data — it is yours. You can delete it by removing the application and its support directory.',
					'LLM API keys are stored in the macOS keychain under the service "run.altr.desktop". They persist until you remove them via the Altr settings or macOS Keychain Access.',
				],
			},
			{
				heading: 'Integration event transit data',
				body: [
					'Webhook events from connected integrations (Slack, GitHub, Linear, Notion) transit our integration server and are deleted within 24 hours of routing to your device. We do not store the content of integration events beyond the routing window.',
				],
			},
			{
				heading: 'Authentication data',
				body: [
					'OAuth tokens for connected integrations are retained on our integration server until you disconnect the integration in the Altr application. Upon disconnection, tokens are revoked and deleted within 24 hours.',
				],
			},
			{
				heading: 'Email addresses',
				body: [
					'Email addresses collected through our early access signup form or direct communication are retained indefinitely until you request deletion. We use email addresses to communicate about your account, product updates, and (with your consent) marketing.',
					'To remove your email address from our systems, email privacy@altr.run with "Delete my data" in the subject line. We will confirm deletion within 30 days.',
				],
			},
			{
				heading: 'Analytics and error data',
				body: [
					'PostHog analytics events are retained for 12 months. Sentry error reports are retained for 90 days. These retention periods are the defaults for each platform and align with our operational needs for debugging and product development.',
				],
			},
			{
				heading: 'Account termination',
				body: [
					'If you terminate your Altr account or request account deletion, we will delete all data we hold about you within 30 days. This includes email address, integration OAuth tokens, and any analytics data linked to your identifier.',
					'Some data may be retained beyond this period where required by law (for example, financial records). We will inform you if this applies.',
				],
			},
		],
	},
}
