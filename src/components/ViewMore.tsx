import Link from 'next/link'

type ViewMoreProps = {
  href: string
}

export const ViewMore: React.VFC<ViewMoreProps> = ({ href }) => (
  <p className="text-center font-medium text-blue-500 underline sm:text-lg lg:text-xl">
    <Link href={href}>
      <a>View More</a>
    </Link>
  </p>
)
