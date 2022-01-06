module.exports = {
    name: 'ready',
    once: true,
    execute: function(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('Minecraft', { type: 'PLAYING' });
    }
}