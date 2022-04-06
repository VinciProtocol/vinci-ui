import type { UrlObject } from 'url'

export type Language = {
  code: string
  flag: string
  name: string
  value: string
}

export type LanguageMenuItemProps = {
  currentLanguageCode: string
  language: Language
  url: UrlObject
}

export type LanguageMenuProps = {}
