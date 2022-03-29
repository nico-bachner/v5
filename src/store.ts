import { atom } from 'jotai'

export const storedLoaded = atom(false)
export const storedCommandMenuOpen = atom(false)
export const storedReaderMode = atom<'sans' | 'serif'>('sans')
