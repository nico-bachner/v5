import { atom } from 'jotai'

import type { Option } from './types'

export const storedEventsAfterClose = atom<(() => void)[]>([])
export const storedQuery = atom('')
export const storedRecents = atom<Option[]>([])
export const storedTab = atom(['Home'])
