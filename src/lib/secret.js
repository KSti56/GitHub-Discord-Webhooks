/**
 * @name GitHub-Discord-Webhooks
 * @file Manage secrets and hashes for authenticating GitHub webhook requests
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

const { getRepositoryConfig } = require('./repository')
const crypto = require('crypto')

/**
 * Hash the data with the secret
 * @param {string} secret The secret to hash the data with
 * @param {string} data The data to hash
 * @returns {string} The hashed data
 */
const getHash = (secret, data) => {
    if (!secret) return
    return crypto.createHmac('sha256', secret)
        .update(data)
        .digest('hex')
}

/**
* Check if the secret is included in the request
* @param {Request} req The Express.js request object
* @returns {boolean} Whether the secret is included in the request
*/
const secretIncluded = (req) => {
    return req?.headers && req?.headers['x-hub-signature-256'] !== undefined
}

/**
* Check if the secret is valid
* @param {Request} req The Express.js request object
* @returns {boolean} Whether the secret is valid
*/
const secretValid = (req) => {
    return req.headers && req.headers['x-hub-signature-256'] === 'sha256=' + getHash(getRepositoryConfig(req)?.Secret, JSON.stringify(req.body))
}

module.exports = {
    secretIncluded,
    secretValid
}
