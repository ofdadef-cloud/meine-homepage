import type { ComponentType } from 'react'
import { CogIcon } from '@sanity/icons/Cog'
import { DocumentIcon } from '@sanity/icons/Document'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { HomeIcon } from '@sanity/icons/Home'
import { UsersIcon } from '@sanity/icons/Users'
import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = ['settings', 'homePage', 'supervisionPage', 'contactPage']

function singleton(
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'settings', 'Settings', CogIcon),
      S.divider(),
      singleton(S, 'homePage', 'Home Page', HomeIcon),
      singleton(S, 'supervisionPage', 'Supervision Page', UsersIcon),
      singleton(S, 'contactPage', 'Contact Page', EnvelopeIcon),
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Pages')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? '') && item.getId() !== 'page',
      ),
    ])
