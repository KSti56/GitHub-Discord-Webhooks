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
    const data = getPushEventInfo(req)

    const placeholders = Object.assign({}, data)
    const commits = formatCommits(config.Message.Commits, data.commits)
    const pages = getPages(commits)

    const embeds = []

    pages.forEach((page, index) => {
        const embed = index === 0 ? config.Message.Embed : config.Message.OverflowEmbeds
        embeds.push(formatEmbed(embed, Object.assign({}, placeholders, { commits: page.join('\n') })))
    })
    res.status(200).send({ success: true })
})

module.exports = router
