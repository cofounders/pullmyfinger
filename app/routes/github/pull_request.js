import status from '../../services/github/status'

export default async ({ payload: {
  action, number,
  pull_request: {
    head: {
      sha,
      user: { login: contributor },
      repo: {
        name: repo,
        owner: { login: user }
      }
    }
  }
} }) => {
  console.log(`Pull request ${ user }/${ repo }#${ number } ${ action } by ${ contributor }`)
  if (action !== 'opened') throw Error('Not a new pull request')
  const result = await status(user, repo, sha, 'pending')
  console.log(`Status pending for ${ sha }`)
}
