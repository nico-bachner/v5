import { InfoCard } from 'components/InfoCard'

import type { PageData } from 'lib/data/types'

export const PageCard: React.VFC<PageData> = ({
  path,
  title,
  description,
  reading_time,
}) => (
  <InfoCard
    href={`/${path.join('/')}`}
    header={title}
    body={description}
    cta="Read"
    info={`${
      reading_time[0] == reading_time[1]
        ? reading_time[0]
        : reading_time.join('-')
    } min`}
  />
)
