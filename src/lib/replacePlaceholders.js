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
