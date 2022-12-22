/**
 * @name GitHub-Discord-Webhooks
 * @file Logger Utility
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

// Dependencies
const fs = require('fs')
const chalk = require('chalk')

// Define each type of prefix
const prefixes = {
    info: {
        text: '[INFO]',
        color: '#57ff6b',
        bold: true
    },
    warning: {
        text: '[WARNING]',
        color: '#ffa040',
        bold: true
    },
    error: {
        text: '[ERROR]',
        color: '#ff5e5e',
        bold: true
    }
}

/**
 * Add color formatting to text
 * @param {string} type The type of prefix
 * @returns {string}
 */
const getPrefix = type => {
    const { text, color } = prefixes[type || 'info']
    if (!text || !color) return chalk.hex('#57ff6b')('[INFO]')

    return chalk.hex(color)(text)
}

/**
 * Log a message to the console and to a file
 * @param {string} message The message to log
 * @param {string} prefix The prefix to show
 */
module.exports = (message, prefix = 'info') => {
    const date = new Date()
    const MMDDYYYY = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('-')

    console.log(getPrefix(prefix || 'info'), chalk.hex('#b3b3b3')(message))

    if (!fs.existsSync('./logs')) fs.mkdirSync('./logs')
    fs.appendFileSync(`./logs/${MMDDYYYY}.log`, `[${date.toLocaleString()}] [${(prefix || 'info').toUpperCase()}] ${message}\n`)
}
