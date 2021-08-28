export default function loggerCode() {
    return `
    const config = require('./config.json')
    const webhook = new WebhookClient(config.id, config.token)
    
    `
}