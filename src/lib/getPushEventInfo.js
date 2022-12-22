const getPlural = (num) => num === 1 ? '' : 's'
const getDiscordTimestamp = (timestamp) => '<t:' + Math.floor(new Date(timestamp).getTime() / 1000) + ':R>'

const getPushEventInfo = (req) => {
    const { repository, sender, commits, compare, ref } = req.body
    return {
        // Repostitory Info
        'branch-name' : ref.replace('refs/heads/', ''),
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
