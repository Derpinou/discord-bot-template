# discord-bot-template
Discord Bot template using discord.js

## Installation

### Required: 
> [NodeJS](https://nodejs.org/en/) (latest version)
> 
> [Git](https://git-scm.com/)


### Clone Repository & download dependencies

```bash
git clone https://github.com/derpinou/discord-bot-template.git
cd discord-bot-template
npm install
```

### Edit configuration

Rename .env.example > .env
Fill it with your personal bot token [Find it here](https://discord.com/developers/applications/me)

If you want to change the bot status, go to config.json, and edit the "presence" property.

If you want to deploy slash commands when the bot start, go to config.json, and set the "deployCommands" property to `true`.

If your bot need some intents to works correctly, go to config.json, and fill the "intents" property array, with the needed intents ([Find they in the list here](deployCommands)).

If you want to contribute to the project, you can fork the repository, make your changes, and open a pull request.

If you have a question/issue/suggestion, you can open an issue on the repository or post it in my [discord server](https://discord.gg/VwSpRQHyUC).







