import Link from "next/link";

type InfoCardProps = {
  href: string;
  header: string;
  body: string;
  cta: string;
  info?: string;
};

export const InfoCard: React.VFC<InfoCardProps> = ({
  href,
  header,
  body,
  cta,
  info,
}) => (
  <Link href={href}>
    <a className="flex transform flex-col gap-4 rounded-lg border border-white/20 bg-white/25 p-6 shadow-lg backdrop-blur-sm transition duration-300 md:p-10 md:hover:scale-105 md:hover:shadow-xl lg:p-12">
      <p className="text-3xl font-extrabold tracking-tight md:text-4xl">
        <strong>{header}</strong>
      </p>
      <p className="prose-lg prose-slate md:prose-xl">{body}</p>
      <div className="flex justify-between text-lg md:text-xl">
        <p className="text-blue-500">{cta} →</p>
        <p className="text-slate-400">{info}</p>
      </div>
    </a>
  </Link>
);
