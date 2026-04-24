/**
 * Brandfetch Logo CDN utility
 *
 * URL pattern:
 *   https://cdn.brandfetch.io/{domain}/w/{w}/h/{h}/theme/{theme}/fallback/{fallback}/type/{type}?c={clientId}
 *
 * Docs: https://docs.brandfetch.com/logo-api/parameters
 */

export type BrandLogoOptions = {
	/** Width in px — aspect ratio is maintained */
	width?: number
	/** Height in px — aspect ratio is maintained */
	height?: number
	/** Light or dark variant of the logo */
	theme?: 'light' | 'dark'
	/**
	 * `icon`   — square icon / app icon (default)
	 * `logo`   — full horizontal wordmark
	 * `symbol` — standalone mark without wordmark
	 */
	type?: 'icon' | 'logo' | 'symbol'
	/**
	 * What to return when no match is found:
	 * `brandfetch`  — generic Brandfetch placeholder (default)
	 * `transparent` — transparent 1×1 pixel
	 * `lettermark`  — auto-generated letter mark (icon type only)
	 * `404`         — HTTP 404
	 */
	fallback?: 'brandfetch' | 'transparent' | 'lettermark' | '404'
}

export function getBrandLogoUrl(domain: string, opts: BrandLogoOptions = {}): string {
	const {
		width,
		height,
		theme,
		type = 'icon',
		fallback = 'brandfetch',
	} = opts

	const clientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID ?? ''

	// Build path segments in the order Brandfetch expects
	const segments: string[] = [`https://cdn.brandfetch.io/${domain}`]
	if (width)   segments.push(`w/${width}`)
	if (height)  segments.push(`h/${height}`)
	if (theme)   segments.push(`theme/${theme}`)
	segments.push(`fallback/${fallback}`)
	segments.push(`type/${type}`)

	return `${segments.join('/')}?c=${clientId}`
}

/**
 * Well-known domains for integrations built into Altr.
 * Add new integrations here so `getBrandLogoUrl` can be called
 * with a simple slug from anywhere in the codebase.
 */
export const INTEGRATION_DOMAINS: Record<string, string> = {
	slack:     'slack.com',
	github:    'github.com',
	linear:    'linear.app',
	notion:    'notion.so',
	pagerduty: 'pagerduty.com',
	jira:      'atlassian.com',
	figma:     'figma.com',
	confluence: 'atlassian.com',
	sentry:    'sentry.io',
	datadog:   'datadoghq.com',
	vercel:    'vercel.com',
}

/** Convenience: get an icon-sized logo URL for a known integration slug */
export function getIntegrationLogoUrl(slug: string, size = 48): string {
	const domain = INTEGRATION_DOMAINS[slug] ?? `${slug}.com`
	return getBrandLogoUrl(domain, { width: size, height: size, type: 'icon', fallback: 'lettermark' })
}
