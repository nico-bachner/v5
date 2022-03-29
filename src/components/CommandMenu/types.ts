export type Option = {
  id: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  group?: string
  shortcut?: string
  action?: () => void
  children?: Option[]
}
