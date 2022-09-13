import { InfoCard } from 'components/InfoCard'

import type { JSONProjectData } from 'lib/data/types'

const getPeriod = (from: number, to: number | null) => {
  const from_year = new Date(from).getFullYear()

  if (to) {
    const to_year = new Date(to).getFullYear()

    if (to_year == from_year) {
      return to_year.toString()
    }

    if (to_year - from_year == 1) {
      return [from_year, to_year].join('/')
    }

    return [from_year, to_year].join(' – ')
  }

  return `${from_year} – Now`
}

export const ProjectCard: React.VFC<JSONProjectData> = ({
  path,
  title,
  description,
  from,
  to,
}) => {
  return (
    <InfoCard
      href={'/' + path.join('/')}
      header={title}
      body={description ?? undefined}
      cta="More Information"
      info={getPeriod(from, to)}
    />
  )
}
