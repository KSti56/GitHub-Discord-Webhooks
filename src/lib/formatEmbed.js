const replacePlaceholders = require('./replacePlaceholders')

const formatEmbed = (embed, placeholders) => {
    const fields = embed?.Fields?.map(field => {
        return {
            name: replacePlaceholders(field?.Name, placeholders),
            value: replacePlaceholders(field?.Value, placeholders),
            inline: field?.Inline
        }
    })

    return {
        title: replacePlaceholders(embed?.Title, placeholders),
        description: replacePlaceholders(embed?.Description, placeholders),
        url: replacePlaceholders(embed?.URL, placeholders),
        color: parseInt(embed?.Color?.replace(/#/g, ''), 16),
        timestamp: embed?.Timestamp,
        footer: {
            text: replacePlaceholders(embed?.Footer?.Text, placeholders),
            icon_url: replacePlaceholders(embed?.Footer?.Icon, placeholders)
        },
        thumbnail: replacePlaceholders(embed?.Thumbnail, placeholders),
        image: replacePlaceholders(embed?.Image, placeholders),
        author: {
            name: replacePlaceholders(embed?.Author?.Name, placeholders),
            url: replacePlaceholders(embed?.Author?.URL, placeholders),
            icon_url: replacePlaceholders(embed?.Author?.Icon, placeholders)
        },
        fields
    }
}

module.exports = formatEmbed
