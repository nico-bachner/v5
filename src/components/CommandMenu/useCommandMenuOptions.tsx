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
import { isCommandMenuOpen } from 'store'

import type { CommandMenuOption } from './types'

export const useCommandMenuOptions = () => {
  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)
  const { setTheme } = useTheme()
  const router = useRouter()

  return useMemo<CommandMenuOption[]>(
    () => [
      {
        icon: AdjustmentsIcon,
        title: 'Open Command Menu',
        group: 'general',
        shortcut: 'cmd+k',
        action: () => {
          setIsOpen(!isOpen)
        },
      },
      {
        icon: ClipboardCopyIcon,
        title: 'Copy Current URL',
        group: 'general',
        action: () => {
          navigator.clipboard.writeText(window.location.href)
        },
      },
      {
        icon: DesktopComputerIcon,
        title: 'Change Theme...',
        group: 'general',
        children: [
          {
            icon: SunIcon,
            title: 'Change Theme to Light',
            group: 'general',
            action: () => {
              setTheme('light')
            },
          },
          {
            icon: MoonIcon,
            title: 'Change Theme to Dark',
            group: 'general',
            action: () => {
              setTheme('dark')
            },
          },
          {
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
        icon: HomeIcon,
        title: 'Home',
        group: 'navigation',
        shortcut: 'ctrl+1',
        action: () => {
          router.push('/')
        },
      },
      {
        icon: CollectionIcon,
        title: 'Projects',
        group: 'navigation',
        shortcut: 'ctrl+2',
        action: () => {
          router.push('/projects')
        },
      },
      {
        icon: PencilIcon,
        title: 'Writing',
        group: 'navigation',
        shortcut: 'ctrl+3',
        action: () => {
          router.push('/writing')
        },
      },
      {
        icon: TerminalIcon,
        title: 'Uses',
        group: 'navigation',
        shortcut: 'ctrl+4',
        action: () => {
          router.push('/uses')
        },
      },
      {
        icon: IdentificationIcon,
        title: 'Curriculum Vitae',
        group: 'links',
        action: () => {
          window.open('https://read.cv/nico_bachner')
        },
      },
      {
        icon: AtSymbolIcon,
        title: 'Email',
        group: 'links',
        action: () => {
          window.open('mailto:mail@nbac.me')
        },
      },
      {
        icon: CodeIcon,
        title: 'Source Code',
        group: 'links',
        shortcut: 'alt+cmd+u',
        action: () => {
          window.open('https://github.com/nico-bachner/v5')
        },
      },
    ],
    [router, isOpen, setIsOpen, setTheme]
  )
}
