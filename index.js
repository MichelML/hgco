#! /usr/bin/env node
const spawn = require('child_process').spawn
const exec = require('child_process').exec

exec('hg branch', (error, stdout, stderr) => {
  if (error) throw error

  const COMMIT_MESSAGE = process.argv[process.argv.indexOf('-m') + 1]
  const JIRA_ISSUE_KEY = stdout.match(/\D{3,4}-\d{1,4}/)

  if (!COMMIT_MESSAGE || !JIRA_ISSUE_KEY) {
    if (!COMMIT_MESSAGE) throw new Error('No commit message provided while it is required.\nUse the following terminal syntax when using hgco:\n"hgco -m \'your commit message goes here\'"')
    if (!JIRA_ISSUE_KEY) throw new Error('No JIRA issue key found on your current branch. Make sure your branch name contains a JIRA issue key.')
  } else {
    const hgco = spawn('hg', ['commit', '-m', `${COMMIT_MESSAGE} [${JIRA_ISSUE_KEY}]`], {stdio: 'inherit'})

    process.stdout.on('data', (data) => {
      console.log(data)
    })

    process.stderr.on('data', (data) => {
      console.log(`Error: ${data}`)
    })

    hgco.on('close', () => {
      exec('hg log -l 1', (error, stdout, stderr) => {
        if (error) throw error
        console.log('\n' + stdout)
        if (require.main === module) process.exit()
      })
    })
  }
})
