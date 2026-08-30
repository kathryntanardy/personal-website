/// <reference types="node" />

const contributionQuery = `
  query GitHubContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`

type ServerlessResponse = {
  status: (code: number) => ServerlessResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
  end: () => void
}

type ServerlessRequest = {
  method?: string
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = process.env.GITHUB_TOKEN
  const login = process.env.GITHUB_USERNAME

  if (!token || !login) {
    res.status(500).json({
      error: 'Missing GitHub configuration',
      message: 'Add GITHUB_TOKEN and GITHUB_USERNAME to your environment variables.',
    })
    return
  }

  try {
    const githubResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: contributionQuery,
        variables: { login },
      }),
    })

    const payload = await githubResponse.json()

    if (!githubResponse.ok || payload.errors) {
      res.status(githubResponse.status || 502).json({
        error: 'GitHub request failed',
        details: payload.errors ?? payload,
      })
      return
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar

    if (!calendar) {
      res.status(404).json({ error: `No contribution calendar found for ${login}` })
      return
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json(calendar)
  } catch {
    res.status(500).json({ error: 'Unable to load GitHub contributions' })
  }
}
