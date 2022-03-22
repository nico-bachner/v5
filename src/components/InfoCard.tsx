import Link from 'next/link'

import { motion } from 'framer-motion'

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
    <a>
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{
          scale: 2,
          transition: { type: 'inertia', velocity: 0.05 },
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.1 }}
        className="flex flex-col gap-2 rounded-lg bg-white/50 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:shadow-xl dark:bg-zinc-800/50 md:gap-4 md:p-10 lg:gap-6 lg:p-12"
      >
        <p className="text-2xl md:text-3xl md:tracking-tight lg:text-4xl">
          <strong className="font-extrabold">{header}</strong>
        </p>
        <p className="prose prose-slate dark:prose-invert md:prose-lg lg:prose-xl">
          {body}
        </p>
        <div className="flex justify-between md:text-lg lg:text-xl">
          <p className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            {cta} {'->'}
          </p>
          <p className="text-slate-400">{info}</p>
        </div>
      </motion.div>
    </a>
  </Link>
)
