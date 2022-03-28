import { InfoCard } from 'components/InfoCard'

import type { ArticleData } from 'lib/data/types'

export const ArticleCard: React.VFC<ArticleData> = ({
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
