export const fetchJSON: Fetch<RequestInfo, any> = async (info) => {
  const res = await fetch(info, {
    headers: {
      Authorization: ['token', process.env.GITHUB_TOKEN].join(' '),
    },
  })

  const json = await res.json()

  return json
}
