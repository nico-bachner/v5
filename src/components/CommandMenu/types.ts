export type CommandMenuOption = {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  group?: string
  shortcut?: string
  action?: () => void
  children?: CommandMenuOption[]
}
