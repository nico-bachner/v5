import { InfoCard } from 'components/InfoCard'

import type { JSONPageData } from 'lib/data/types'

export const PageCard: React.VFC<JSONPageData> = ({
  type,
  title,
  description,

  path,
}) => (
  <InfoCard
    href={`/${path.join('/')}`}
    header={title}
    body={description ?? undefined}
    cta="Read"
    info={type ?? undefined}
  />
)
