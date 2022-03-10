type GitHubHistory = {
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
  }
}

type GitHubProps = {
  user: string
  repo: string
  baseBranch: string
  basePath: string[]
  path: string[]
  extension: string
}

const basePath = ['content', 'pages']
const extension = 'mdx'

export const fetchDateUpdated: Fetch<GitHubProps, Date | undefined> = async ({
  user,
  repo,
  path,
}) => {
  const fullPath = [...basePath, ...path].join('/')
  const fullFilePath = [fullPath, extension].join('.')

  const res = await fetch(
    [
      'https://api.github.com/repos',
      user,
      repo,
      `commits?path=${fullFilePath}`,
    ].join('/')
  )
  const history: GitHubHistory[] = await res.json()
  const latest: GitHubHistory | undefined = history[0]

  if (latest) {
    return new Date(latest.commit.author.date)
  }
}

export const getEditUrl: Get<GitHubProps, string> = ({
  user,
  repo,
  baseBranch,
  basePath,
  path,
  extension,
}) => {
  const fullPath = [...basePath, ...path].join('/')
  const fullFilePath = [fullPath, extension].join('.')

  const editUrl = [
    'https://github.com',
    user,
    repo,
    'edit',
    baseBranch,
    fullFilePath,
  ].join('/')

  return editUrl
}

export const getNewUrl: Get<GitHubProps, string> = ({
  user,
  repo,
  baseBranch,
  basePath,
}) =>
  ['https://github.com', user, repo, 'new', baseBranch, ...basePath].join('/')
