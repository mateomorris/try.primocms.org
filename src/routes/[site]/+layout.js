import axios from 'axios'
import {redirect} from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').Load} */
export async function load(event) {
  const [ parent_url = 'index', child_url ] = event.params['page']?.split('/') ?? []
  const page_url = child_url ?? parent_url

  if (event.params.site === 'favicon.ico') {
    redirect(301, '/')
  }

  const {data} = await axios.get(`https://raw.githubusercontent.com/mateomorris/${event.params.site}/main/primo.json`)
  const {site, pages, sections, symbols} = data
  const page = pages.find(page => page.url === (page_url ?? 'index'))

  return {
    user: {
      role: 'DEV'
    },
    site,
    page,
    pages,
    sections: sections.filter(s => s.page === page.id).map(section => ({
      ...section,
      symbol: symbols.find(symbol => symbol.id === section.symbol)
    })),
    symbols
  }
}