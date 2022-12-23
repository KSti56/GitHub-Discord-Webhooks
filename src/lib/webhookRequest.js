/**
 * @name GitHub-Discord-Webhooks
 * @file Send Discord webhook request
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

const fetch = require('node-fetch')

/**
 * Send Discord webhook request
 * @param {string} url The Discord webhook URL
 * @param {*} data The data to send to the webhook
 * @returns {void}
 */
const webhookRequest = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

module.exports = webhookRequest
