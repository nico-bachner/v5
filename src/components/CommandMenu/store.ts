import { atom } from 'jotai'

import type { CommandMenuOption } from './types'

export const commandMenuOptions = atom<CommandMenuOption[]>([])
export const commandMenuHistory = atom<CommandMenuOption[]>([])
export const showCommandMenuHistory = atom(true)
