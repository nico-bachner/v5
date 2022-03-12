import Link from 'next/link'

type InfoCardProps = {
  href: string
  header: string
  body: string
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
    <a className="flex transform flex-col gap-4 rounded-lg border border-white/20 bg-white/25 p-6 shadow-lg backdrop-blur-sm md:p-10 md:transition md:duration-300 md:hover:scale-105 md:hover:shadow-xl lg:p-12">
      <p className="text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl">
        <strong>{header}</strong>
      </p>
      <p className="prose prose-slate md:prose-lg lg:prose-xl">{body}</p>
      <div className="flex justify-between md:text-lg lg:text-xl">
        <p className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
          {cta} {'->'}
        </p>
        <p className="text-slate-400">{info}</p>
      </div>
    </a>
  </Link>
)
