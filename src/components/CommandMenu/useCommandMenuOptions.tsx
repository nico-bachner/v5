import {
  AdjustmentsIcon,
  AtSymbolIcon,
  ClipboardCopyIcon,
  CodeIcon,
  CollectionIcon,
  DesktopComputerIcon,
  HomeIcon,
  IdentificationIcon,
  MoonIcon,
  PencilIcon,
  SunIcon,
  TerminalIcon,
} from '@heroicons/react/outline'

import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useAtom } from 'jotai'
import { commandMenuOpen, commandMenuTab } from './store'

import type { CommandMenuOption } from './types'

export const useCommandMenuOptions = () => {
  const [open, setOpen] = useAtom(commandMenuOpen)
  const [tab, setTab] = useAtom(commandMenuTab)
  const { setTheme } = useTheme()
  const router = useRouter()

  return useMemo<CommandMenuOption[]>(
    () => [
      {
        id: 'Command Menu',
        icon: AdjustmentsIcon,
        title: 'Open Command Menu',
        group: 'general',
        shortcut: 'cmd+k',
        action: () => {
          setOpen(!open)
        },
      },
      {
        id: 'Copy URL',
        icon: ClipboardCopyIcon,
        title: 'Copy Current URL',
        group: 'general',
        action: () => {
          navigator.clipboard.writeText(window.location.href)
        },
      },
      {
        id: 'Theme',
        icon: DesktopComputerIcon,
        title: 'Change Theme...',
        group: 'general',
        shortcut: 't',
        action: () => {
          setOpen(true)
          setTab(['Home', 'Theme'])
        },
        children: [
          {
            id: 'Light Theme',
            icon: SunIcon,
            title: 'Change Theme to Light',
            group: 'general',
            action: () => {
              setTheme('light')
            },
          },
          {
            id: 'Dark Theme',
            icon: MoonIcon,
            title: 'Change Theme to Dark',
            group: 'general',
            action: () => {
              setTheme('dark')
            },
          },
          {
            id: 'System Theme',
            icon: DesktopComputerIcon,
            title: 'Change Theme to System',
            group: 'general',
            action: () => {
              setTheme('system')
            },
          },
        ],
      },
      {
        id: 'Home',
        icon: HomeIcon,
        title: 'Home',
        group: 'navigation',
        shortcut: 'ctrl+1',
        action: () => {
          router.push('/')
        },
      },
      {
        id: 'Projects',
        icon: CollectionIcon,
        title: 'Projects',
        group: 'navigation',
        shortcut: 'ctrl+2',
        action: () => {
          router.push('/projects')
        },
      },
      {
        id: 'Writing',
        icon: PencilIcon,
        title: 'Writing',
        group: 'navigation',
        shortcut: 'ctrl+3',
        action: () => {
          router.push('/writing')
        },
      },
      {
        id: 'Uses',
        icon: TerminalIcon,
        title: 'Uses',
        group: 'navigation',
        shortcut: 'ctrl+4',
        action: () => {
          router.push('/uses')
        },
      },
      {
        id: 'CV',
        icon: IdentificationIcon,
        title: 'Curriculum Vitae',
        group: 'links',
        action: () => {
          window.open('https://read.cv/nico_bachner')
        },
      },
      {
        id: 'Email',
        icon: AtSymbolIcon,
        title: 'Send me an email',
        group: 'links',
        shortcut: '@',
        action: () => {
          window.open('mailto:mail@nbac.me')
        },
      },
      {
        id: 'Source',
        icon: CodeIcon,
        title: 'View Source Code',
        group: 'links',
        shortcut: 'alt+cmd+u',
        action: () => {
          window.open('https://github.com/nico-bachner/v5')
        },
      },
    ],
    [open, setOpen, setTab, router, setTheme]
  )
}
