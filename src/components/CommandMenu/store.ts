import { atom } from 'jotai'

import type { CommandMenuOption } from './types'

export const pageLoaded = atom(false)
export const commandMenuOpen = atom(false)
export const commandMenuTab = atom(['Home'])
export const commandMenuQuery = atom('')
export const commandMenuOptions = atom<CommandMenuOption[]>([])
