/**
 * @name GitHub-Discord-Webhooks
 * @file GET / Route
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

// Router Setup
const express = require('express')
const router = express.Router()

// Utils
const { getRepositoryConfig } = require('../lib/repository')

// Middleware
const authorizationMiddleware = require('../lib/authorization')

router.post('/', authorizationMiddleware, async (req, res) => {
    if (req.headers['x-github-event'] !== 'push') return res.status(400).send({ error: 'Push event only' })

    const config = getRepositoryConfig(req)
    if (!config) return res.status(400).send({ error: 'Bad Request' })

    console.log(req.body)

    res.status(200).send({ success: true })
})

module.exports = router
