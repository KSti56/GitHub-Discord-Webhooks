/**
 * @name GitHub-Discord-Webhooks
 * @file Repository Utilities
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

const config = require('./config')
const log = require('./log')

/**
* Get the GitHub repository name from the request
* @param {Request} req The Express.js request object
* @returns {string} The repository name
*/
const getRepositoryName = (req) => {
    return req.body.repository.full_name
}

/**
* Get the configuration for the repository webhook
* @param {Request} req The Express.js request object
* @returns {object} The configuration for the repository webhook
*/
const getRepositoryConfig = (req) => {
    const repositoryName = getRepositoryName(req)
    const repositoryConfig = config.CommitForwarding[repositoryName]
    if (!repositoryConfig) log(`No configuration found for repository ${repositoryName}`, 'error')
    return repositoryConfig
}

module.exports = {
    getRepositoryName,
    getRepositoryConfig
}
