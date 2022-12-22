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
const log = require('../lib/log')
const { getRepositoryConfig } = require('../lib/repository')
const getPushEventInfo = require('../lib/getPushEventInfo')
const formatEmbed = require('../lib/formatEmbed')
const formatCommits = require('../lib/formatCommits')
const getPages = require('../lib/getPages')
const webhookRequest = require('../lib/webhookRequest')
const replacePlaceholders = require('../lib/replacePlaceholders')

// Middleware
const authorizationMiddleware = require('../lib/authorization')

router.post('/', authorizationMiddleware, async (req, res) => {
    if (req.headers['x-github-event'] !== 'push') return res.status(400).send({ error: 'Push event only' })

    const config = getRepositoryConfig(req)
    if (!config) return res.status(400).send({ error: 'Bad Request' })

    const data = getPushEventInfo(req)

    const placeholders = Object.assign({}, data)
    const commits = formatCommits(config.Message.Commits, data.commits)
    const pages = getPages(commits)

    const embeds = []

    pages.forEach((page, index) => {
        const embed = index === 0 ? config.Message.Embed : config.Message.OverflowEmbeds
        embeds.push(formatEmbed(embed, Object.assign({}, placeholders, { commits: page.join('\n') })))
    })

    webhookRequest(config.Webhook, {
        embeds,
        content: replacePlaceholders(config.Message.Content, placeholders)
    })
        .then(() => {
            log(`Webhook message sent successfully (Repository: ${data['repository-full-name']} | Commits: ${data['commit-count']})`)
        })
        .catch(err => {
            log(`Webhook message failed to send (Repository: ${data['repository-full-name']} | Commits: ${data['commit-count']}). Error: ` + err, 'error')
        })

    res.status(200).send({ success: true })
})

module.exports = router
