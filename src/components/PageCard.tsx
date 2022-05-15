import { InfoCard } from 'components/InfoCard'

import type { JSONPageData } from 'lib/data/types'

export const PageCard: React.VFC<JSONPageData> = ({
  category,
  title,
  description,

  path,
}) => (
  <InfoCard
    href={`/${path.join('/')}`}
    header={title}
    body={description}
    cta="Read"
    info={category}
  />
)
