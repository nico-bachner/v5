import { atom } from 'jotai'

export const storedCommandMenuOpen = atom(false)
export const storedReaderMode = atom<'sans' | 'serif'>('sans')
export const storedPagesFilters = atom<string[]>([])
export const storedPagesQuery = atom('')
