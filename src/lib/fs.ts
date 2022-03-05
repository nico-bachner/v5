import { readFile, readdir } from "fs/promises";

type Props = {
  basePath: string[];
  path: string[];
  extension?: string;
};

const fetchFile: Fetch<Props, string> = async ({
  basePath,
  path,
  extension,
}) => {
  const fullPath = [...basePath, ...path].join("/");

  const fullFilePath = [fullPath, extension].join(".");

  const file = await readFile(fullFilePath, "utf-8");

  return file;
};

const fetchDirs: Fetch<Props, string[][]> = async ({ basePath, path }) => {
  const files = await readdir(
    [process.cwd(), ...basePath, ...path].join("/"),
    "utf-8"
  );

  return files
    .filter((file) => file.split(".").length == 1)
    .map((file) => [...path, file]);
};

const fetchPaths: Fetch<Props, string[][]> = async ({
  basePath,
  path,
  extension,
}) => {
  const files = await readdir(
    [process.cwd(), ...basePath, ...path].join("/"),
    "utf-8"
  );

  if (extension) {
    return files
      .filter((file) => file.includes(extension))
      .map((file) => {
        const [slug] = file.split(".");

        return [...path, slug as string];
      });
  }

  return files.map((file) => {
    const [slug] = file.split(".");

    return [...path, slug as string];
  });
};

const fetchRecursivePaths: Fetch<Props, string[][]> = async ({
  basePath,
  path,
  extension,
}) => {
  const paths = await fetchPaths({
    basePath,
    path,
    extension,
  });

  const dirs = await fetchDirs({
    basePath,
    path,
  });

  if (!dirs.length) {
    return paths;
  }

  const restPaths = await Promise.all(
    dirs.map(
      async (path) =>
        await fetchRecursivePaths({
          basePath,
          path,
          extension,
        })
    )
  );

  return [paths, ...restPaths].flat();
};

export { fetchFile, fetchPaths, fetchRecursivePaths };
