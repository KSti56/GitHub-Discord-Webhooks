/**
 * @name GitHub-Discord-Webhooks
 * @file Main entry point for the GitHub -> Discord Webhook project
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

// Dependencies
const express = require('express')
const bodyParser = require('body-parser')

// Utilities
const log = require('./lib/log')
const config = require('./lib/config')

// Express Setup
const app = express()
app.use(bodyParser.json())

// Routes
app.use('/', require('./routes/index'))

// Catch all non-existent routes (404)
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' })
})

// Start Server
app.listen(config.Webserver.Port, config.Webserver.IP, () => {
    log(`Server started at http://${config.Webserver.IP}:${config.Webserver.Port}`)
})
