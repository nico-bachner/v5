import Link from 'next/link'

type InfoCardProps = {
  href: string
  header: string
  body?: string
  cta: string
  info?: string
}

export const InfoCard: React.VFC<InfoCardProps> = ({
  href,
  header,
  body,
  cta,
  info,
}) => (
  <Link href={href}>
    <a>
      <div className="flex h-full flex-col justify-between gap-2 rounded-xl border border-zinc-200 bg-white/50 p-6 backdrop-blur-sm transition duration-300 hover:border-white hover:shadow-lg dark:border-zinc-700 dark:bg-black dark:hover:bg-zinc-800/50 sm:gap-3 sm:p-10 lg:gap-4 lg:p-12">
        <p className="text-xl sm:text-2xl md:tracking-tight lg:text-3xl">
          <strong className="font-extrabold">{header}</strong>
        </p>
        <p className="prose prose-slate line-clamp-2 dark:prose-invert sm:prose-lg lg:prose-xl">
          {body}
        </p>
        <div className="flex items-center justify-between sm:text-lg lg:text-xl">
          <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold tracking-tight text-transparent">
            {cta} <span className="font-sans">{'->'}</span>
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">{info}</p>
        </div>
      </div>
    </a>
  </Link>
)
