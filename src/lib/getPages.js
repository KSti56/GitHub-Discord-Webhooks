/**
 * @name GitHub-Discord-Webhooks
 * @file Separate commit messages into "pages" because of Discord's 4096 character limit for embed descriptions
 * @author ThisLightMan <light@corebot.dev>
 * @license MIT
 * @version 1.0
 */

// Discord's 4096 character limit for embed descriptions
const MAX_LENGTH = 4096

/**
 * Calculate the length of joined strings in an array
 * @param {array<string>} arr Calculate the length of joined strings in an array
 * @returns {number} The length of the joined strings
 */
const calculateCharacterLength = arr => arr.join('\n').length

/**
 * Separate commit messages into "pages" because of Discord's 4096 character limit for embed descriptions
 * @param {array<string>} commits Array of commit messages
 * @returns {array<array<string>>} Array of arrays of commit messages (pages)
 */
const getPages = (commits) => {
    const pages = []
    let pageIndex = 0
    for (const commit of commits) {
        if (!pages[pageIndex]) pages[pageIndex] = []

        if (calculateCharacterLength(pages[pageIndex]) + commit.length > MAX_LENGTH) {
            pageIndex++
            pages[pageIndex] = [commit]
        } else {
            pages[pageIndex].push(commit)
        }
    }
    return pages
}

module.exports = getPages
