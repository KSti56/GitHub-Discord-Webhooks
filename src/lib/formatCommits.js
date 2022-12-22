const replacePlaceholders = require('./replacePlaceholders')

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
