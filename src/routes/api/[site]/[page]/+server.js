import { json } from '@sveltejs/kit';
import axios from 'axios'

export async function GET({ params }) {

  const {data} = await axios.get(`https://raw.githubusercontent.com/mateomorris/${params.site}/main/primo.json`)

  const site = {
    ...data.site['content']['en'],
    _meta: {
      id: data.site.id,
      name: data.site.name,
      url: data.site.url,
      created_at: data.site.created_at
    }
  }

  const current_page = data.pages.find(page => page.url === params.page)
  const page = {
    ...current_page['content']['en'],
    _meta: {
      id: current_page.id,
      name: current_page.name,
      url: current_page.url,
      created_at: current_page.created_at,
      // filtering here because the query above is not filtering properly (maybe a Supabase bug)
      subpages: data.pages.filter(subpage => subpage.parent === params.page).map(subpage => ({
        id: subpage.id,
        name: subpage.name,
        url: subpage.url,
        created_at: subpage.created_at
      }))
    },
  }

  const sections = data.sections.filter(s => s.page === current_page.id).sort((a,b) => a.index - b.index).map(section => ({
    ...section.content.en,
    _meta: {
      id: section.id,
      symbol: section.symbol,
      created_at: section.created_at
    }
  }))

  return json({
    site,
    page,
    sections
  })
}