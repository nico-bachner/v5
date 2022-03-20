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
  ViewListIcon,
} from '@heroicons/react/outline'

import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useAtom, useSetAtom } from 'jotai'
import { storedReaderMode } from 'store'
import { commandMenuOpen, commandMenuTab } from './store'

export const useCommandMenuOptions = () => {
  const [readerMode, setReaderMode] = useAtom(storedReaderMode)
  const [open, setOpen] = useAtom(commandMenuOpen)
  const { setTheme } = useTheme()
  const setTab = useSetAtom(commandMenuTab)
  const router = useRouter()

  return [
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
      id: 'Reader Mode',
      icon: ViewListIcon,
      title: 'Toggle Reader Mode',
      group: 'general',
      action: () => {
        setReaderMode(!readerMode)
      },
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
      action: () => {
        window.open('mailto:mail@nbac.me')
      },
    },
    {
      id: 'Source',
      icon: CodeIcon,
      title: 'View Source Code',
      group: 'links',
      action: () => {
        window.open('https://github.com/nico-bachner/v5')
      },
    },
  ]
}
