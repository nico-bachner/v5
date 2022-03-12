import {
  AdjustmentsIcon,
  AtSymbolIcon,
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

export const useCommandMenuOptions = () => {
  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)
  const { setTheme } = useTheme()
  const router = useRouter()

  return useMemo(
    () => [
      {
        icon: AdjustmentsIcon,
        title: 'Open Command Menu',
        type: 'general',
        shortcut: '⌘K',
        action: () => {
          setIsOpen(!isOpen)
        },
      },
      {
        icon: SunIcon,
        title: 'Change Theme to Light',
        type: 'general',
        action: () => {
          setTheme('light')
        },
      },
      {
        icon: MoonIcon,
        title: 'Change Theme to Dark',
        type: 'general',
        action: () => {
          setTheme('dark')
        },
      },
      {
        icon: DesktopComputerIcon,
        title: 'Change Theme to System',
        type: 'general',
        action: () => {
          setTheme('system')
        },
      },
      {
        icon: HomeIcon,
        title: 'Home',
        type: 'page',
        shortcut: '^1',
        action: () => {
          router.push('/')
        },
      },
      {
        icon: CollectionIcon,
        title: 'Projects',
        type: 'page',
        shortcut: '^2',
        action: () => {
          router.push('/projects')
        },
      },
      {
        icon: PencilIcon,
        title: 'Writing',
        type: 'page',
        shortcut: '^3',
        action: () => {
          router.push('/writing')
        },
      },
      {
        icon: TerminalIcon,
        title: 'Uses',
        type: 'page',
        shortcut: '^4',
        action: () => {
          router.push('/uses')
        },
      },
      {
        icon: IdentificationIcon,
        title: 'Curriculum Vitae',
        type: 'link',
        action: () => {
          window.open('https://read.cv/nico_bachner')
        },
      },
      {
        icon: AtSymbolIcon,
        title: 'Email',
        type: 'link',
        action: () => {
          window.open('mailto:mail@nbac.me')
        },
      },
      {
        icon: CodeIcon,
        title: 'Source Code',
        type: 'link',
        shortcut: '⌥⌘U',
        action: () => {
          window.open('https://github.com/nico-bachner/v5')
        },
      },
    ],
    [router, isOpen, setIsOpen, setTheme]
  )
}
