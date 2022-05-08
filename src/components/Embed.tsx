type EmbedProps = {
  src: string
  height: number
}

export const Embed: React.VFC<EmbedProps> = ({ src, height }) => (
  <iframe src={src} height={height} className="max-h-96 w-full" />
)
