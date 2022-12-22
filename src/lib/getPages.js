const MAX_LENGTH = 4096

const calculateCharacterLength = arr => arr.join('\n').length

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
