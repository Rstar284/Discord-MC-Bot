const {SlashCommandBuilder} = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('backward')
        .setDescription('Make the mcbot go n steps back')
        .addIntegerOption(option => option.setName('steps').setDescription('The number of steps to go back')),
        async execute(interaction) {
            const steps = parseInt(interaction.options.getInteger('steps')) || 1;
            await interaction.client.bot.lookAt(new Vec3(bot.entity.yaw, 180, 0))
            for(var i = 0; i < steps; i++) {
                await interaction.client.bot.setControlState('back', true);
                //wait for a second
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            await interaction.client.bot.setControlState('back', false);
            return await interaction.reply({ content: 'I\'ve moved back ' + steps + ' steps!'});
        }
}
