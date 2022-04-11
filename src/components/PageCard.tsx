import { InfoCard } from 'components/InfoCard'

import type { PageData } from 'lib/data/types'

export const PageCard: React.VFC<PageData> = ({
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
