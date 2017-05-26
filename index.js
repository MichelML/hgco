#! /usr/bin/env node
const commitMessage = process.argv[process.argv.indexOf('-m') + 1]
const handleError = (message) => { console.log(message || ''); process.exit() }
const shell = require('shelljs')

if (process.argv.length === 2) handleError('Error: Syntax invalid. Use the following terminal syntax when using hgco:\n\nhgco -m \'your commit message goes here\'\n\n')
if (!commitMessage) handleError('Error: No commit message provided while it is required. Use the following terminal syntax when using hgco:\n\nhgco -m \'your commit message goes here\'\n\n')

shell.exec('hg branch', {silent: true}, (code, stdout, stderr) => {
  if (stderr) handleError(stderr)

  const jiraIssueKey = stdout.match(/\D{3,4}-\d{1,4}/)
  if (!jiraIssueKey) handleError('Error: No JIRA issue key found in your current branch name. Make sure your branch name contains a JIRA issue key.')

  shell.exec(`hg commit -m '${commitMessage} [${jiraIssueKey}]'`)

  console.log('\nLast commit made:\n')
  shell.exec('hg log -l 1')

  if (require.main === module) process.exit()
})
