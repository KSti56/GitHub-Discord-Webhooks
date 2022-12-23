/**
 * @name GitHub-Discord-Webhooks
 * @file Given a string and an object with placeholders as keys and their values as values, replace the placeholders in the string with their values
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

/**
 * Replace placeholders in a string with their values
 * @param {string} str The input string
 * @param {object} placeholders An object with placeholders as keys and their values as values
 * @returns {string} The string with placeholders replaced
 */
const replacePlaceholders = (str, placeholders) => {
    if (!str || !placeholders) return str

    const keys = Object.keys(placeholders)
    const values = Object.values(placeholders)

    keys.forEach((placeholder, index) => {
        const value = values[index]
        str = str.replace(new RegExp(`{${placeholder}}`, 'g'), value)
    })

    return str
}

module.exports = replacePlaceholders
