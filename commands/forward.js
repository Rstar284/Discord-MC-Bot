const {SlashCommandBuilder} = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('forward')
        .setDescription('Make the mcbot go n steps forward')
        .addIntegerOption(option => option.setName('steps').setDescription('The number of steps to go forward')),
        async execute(interaction) {
            const steps = parseInt(interaction.options.getInteger('steps')) || 1;
            for(var i = 0; i < steps; i++) {
                await interaction.client.bot.setControlState('forward', true);
                //wait for a second
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            await interaction.client.bot.setControlState('forward', false);
            return await interaction.reply({ content: 'I\'ve moved forward ' + steps + ' steps!'});
        }
}
