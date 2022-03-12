import { atom } from 'jotai'

export const isCommandMenuOpen = atom(false)
export const commandMenuQuery = atom<string | undefined>(undefined)
