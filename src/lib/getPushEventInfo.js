/**
 * @name GitHub-Discord-Webhooks
 * @file Get and format information about the push event from GitHub webhooks
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

/**
 * Check if the number is 1, if it is, return an empty string, otherwise return 's'
 * @param {number} num The number to check
 * @returns {string} 's' if the number is not 1, otherwise ''
 */
const getPlural = (num) => num === 1 ? '' : 's'

/**
 * Convert a timestamp to Discord's relative timestamp format
 * @param {string} timestamp The timestamp to convert
 * @returns {string} The timestamp in Discord's format
 */
const getDiscordTimestamp = (timestamp) => '<t:' + Math.floor(new Date(timestamp).getTime() / 1000) + ':R>'

/**
 * Gets all the information about the push event
 * @param {Request} req The Express request
 * @returns {object} An object with all the information about the push event
 */
const getPushEventInfo = (req) => {
    const { repository, sender, commits, compare, ref } = req.body
    return {
        // Repostitory Info
        'branch-name': ref.replace('refs/heads/', ''),
        'repository-full-name': repository.full_name,
        'repository-name': repository.name,
        'repository-isprivate': repository.private,
        // User Info
        'author-name': sender.login,
        'author-id': sender.id,
        'author-avatar': sender.avatar_url,
        'author-profile': sender.html_url,
        // Commits
        'commit-count': commits.length,
        'commit-plural': 'commit' + getPlural(commits.length),
        'compare-url': compare,
        commits: commits.map(commit => {
            const { id, message, timestamp, url } = commit
            return {
                'short-id': id.substring(0, 7),
                id,
                message,
                timestamp,
                'discord-timestamp': getDiscordTimestamp(timestamp),
                url
            }
        })
    }
}

module.exports = getPushEventInfo
