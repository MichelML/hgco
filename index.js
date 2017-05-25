#! /usr/bin/env node
const logError = (errorMessage) => { console.log(errorMessage); process.exit() }
const shell = require('shelljs')
const silent = {silent: true}
const COMMIT_MESSAGE = process.argv[process.argv.indexOf('-m') + 1]

if (process.argv.length === 2) logError('Error: Syntax invalid. Use the following terminal syntax when using hgco:\n\nhgco -m \'your commit message goes here\'\n\n')
if (!COMMIT_MESSAGE) logError('Error: No commit message provided while it is required. Use the following terminal syntax when using hgco:\n\nhgco -m \'your commit message goes here\'\n\n')

shell.exec('hg branch', silent, (code, stdout, stderr) => {
  if (stderr) logError(stderr)

  const JIRA_ISSUE_KEY = stdout.match(/\D{3,4}-\d{1,4}/)
  if (!JIRA_ISSUE_KEY) logError('Error: No JIRA issue key found in your current branch name. Make sure your branch name contains a JIRA issue key.')

  const hgco = shell.exec(`hg commit -m '${COMMIT_MESSAGE} [${JIRA_ISSUE_KEY}]'`)
  console.log('\nLast commit made:\n')
  const hglog = shell.exec('hg log -l 1')
  if (require.main === module) process.exit()
})
