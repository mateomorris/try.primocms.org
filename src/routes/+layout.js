import _ from 'lodash-es'
import axios from 'axios'
import {redirect} from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').Load} */
export async function load(event) {
  event.depends('app:data')

  if (event.params.site === 'favicon.ico') {
    redirect(301, '/')
  }

  const {data:landing_page} = await axios
    .get(
      'https://raw.githubusercontent.com/mateomorris/primocms.org/main/primo.json'
    )
  
  const themes_section = landing_page.sections.find(
    (section) => section.id === 'ff5c3e56-690b-4220-abe9-9f02a74e1599'
  )

  const sites = themes_section.content.en.templates.filter(
    (template) => template.price === '0' && template.available
  ).map(theme => ({
    ...theme,
    screenshot: theme.screenshots.desktop.url,
    id: theme.name,
    url: theme.repo.slice(12)
  }))

  return {
    sites: _.shuffle(sites),
    user: {
      admin: true,
      email: 'demo@primocms.org'
    }
  }
}