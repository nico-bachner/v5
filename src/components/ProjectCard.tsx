import { InfoCard } from "./InfoCard";

import type { ProjectData } from "lib/data/types";

const getPeriod = (from: number, to: number | null) => {
  const from_year = new Date(from).getFullYear();

  if (to) {
    const to_year = new Date(to).getFullYear();

    if (to_year == from_year) {
      return `${to_year}`;
    }

    return `${from_year} – ${to_year}`;
  }

  return `${from_year} – Present`;
};

export const ProjectCard: React.VFC<ProjectData> = ({
  path,
  title,
  description,
  from,
  to,
}) => {
  return (
    <InfoCard
      href={"/" + path.join("/")}
      header={title}
      body={description}
      cta="More Information"
      info={getPeriod(from, to)}
    />
  );
};
