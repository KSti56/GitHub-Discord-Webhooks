/**
 * @name GitHub-Discord-Webhooks
 * @file Convert config.yml file to JSON
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

const yaml = require('yaml')
const fs = require('fs')

module.exports = yaml.parse(fs.readFileSync('config.yml', 'utf8'))
