/**
 * @name GitHub-Discord-Webhooks
 * @file Format default commit message with commit data
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

const replacePlaceholders = require('./replacePlaceholders')

/**
 * Format default commit message with commit data
 * @param {string} str The format for commit messages (Example: [``{commit-short-id}``]({commit-url}) **{commit-message}**)
 * @param {array<object} commits Array of commit objects
 * @returns {array<string>} Array of formatted commit messages
 */
const formatCommits = (str, commits) => {
    return commits.map(commit => {
        return replacePlaceholders(str, {
            'commit-short-id': commit['short-id'],
            'commit-id': commit.id,
            'commit-message': commit.message,
            'commit-timestamp': commit.timestamp,
            'commit-discord-timestamp': commit['discord-timestamp'],
            'commit-url': commit.url
        })
    })
}

module.exports = formatCommits
