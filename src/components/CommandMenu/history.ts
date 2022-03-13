import { atom } from 'jotai'

import type { CommandMenuOption } from './types'

export const commandMenuHistory = atom<CommandMenuOption[]>([])
