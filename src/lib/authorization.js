const { secretIncluded, secretValid } = require('./secret')
const { getRepositoryName } = require('./repository')
const log = require('./log')

/**
 * Check if the webhook request has valid authentication
 * @param {Request} req The request from Express.js
 * @param {Response} res The response from Express.js
 * @param {Function} next Fully authenticated, continue to next middleware
 * @returns {void}
 */
const authorizationMiddleware = async (req, res, next) => {
    try {
        const repository = getRepositoryName(req) || 'Unknown'
        log(`Checking authorization for webhook event... (Repository: ${repository})`)
        if (!secretIncluded(req)) {
            log(`Secret not included in request (Repository: ${repository})`, 'error')
            res.status(403).json({ error: 'Not Authorized' })
            return
        }

        if (!secretValid(req)) {
            log(`Secret not valid (Repository: ${repository})`, 'error')
            res.status(403).json({ error: 'Not Authorized' })
            return
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
        log('Error in authorization middleware: ' + err, 'error')
        return
    }

    next()
}

module.exports = authorizationMiddleware
