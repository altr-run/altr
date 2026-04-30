'use client'

import { useQueryState } from 'nuqs'
import { VscSearch } from 'react-icons/vsc'
import { count, debounce } from '@/lib/utils'
import type { SearchModule } from '@/sanity/types'
import { Input, InputWrapper } from '@/components/ui/input'
import Loading from '@/ui/loading'
import GoogleResults from './google-results'
import SearchResults from './search-results'
import { handleSearch, useSearchStore } from './store'

export default function ({ scope }: Partial<SearchModule>) {
	const [query, setQuery] = useQueryState('query', { defaultValue: '' })
	const { loading, setLoading, results, setResults } = useSearchStore()

	return (
		<search className="group/search relative">
			<InputWrapper className="py-[0.25em]">
				<VscSearch className="shrink-0 text-[var(--ink-3)] text-[14px]" />
				<Input
					id="query"
					type="search"
					placeholder={scope === 'all' ? 'Search' : `Search ${scope}`}
					defaultValue={query}
					onChange={debounce((e) => {
						setQuery(e.target.value)
						handleSearch({
							scope,
							query: e.target.value,
							setLoading,
							setResults,
						})
					})}
				/>
			</InputWrapper>

			{query && (
				<output
					htmlFor="query"
					className="anim-fade-to-b group-not-hover/search:group-not-has-[:is(:focus,.results:hover)]/search:hidden absolute inset-x-0 top-full z-1"
				>
					<div className="bg-background grid max-h-[10lh] gap-4 overflow-y-auto p-4 shadow-lg">
						{loading ? (
							<Loading>Searching...</Loading>
						) : (
							<>
								<p className="b flex justify-center text-center whitespace-nowrap">
									{count(results, 'result')} found for "
									<span className="overflow-hidden break-all text-ellipsis">
										{query}
									</span>
									"
								</p>

								<SearchResults query={query} />
								<GoogleResults scope={scope} />
							</>
						)}
					</div>
				</output>
			)}
		</search>
	)
}
