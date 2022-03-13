export type CommandMenuOption = {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  type: string
  shortcut?: string
  action: () => void
}
