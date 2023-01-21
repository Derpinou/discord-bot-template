import { 
	AutocompleteInteraction, 
	ButtonStyle, 
	ComponentType, 
	ApplicationCommandOptionType 
} from 'discord.js';
import { Bot } from '../../Classes/Bot';
import { BaseCommand } from '../../Classes/Command';
import { CommandData } from '../../Types/globals';
import https from 'node:https';

export default class MovieCommand extends BaseCommand {

	constructor (client: Bot) {
		super(client, {
			filename: __filename,
			description: 'Get informations about a movie.',
			botPermissions: ['SendMessages'],
			enabled: true,
			guildOnly: false,
			memberPermissions: ['UseApplicationCommands'],
			options: [{
				type: ApplicationCommandOptionType.String,
				name: 'title',
				description: 'Enter a music title.',
				autocomplete: true,
				required: true
			}]
		});
	}

	run ({ interaction }: CommandData): void {

		const movieTitle = interaction.options.getString('title', true);

		interaction.reply({
			embeds: [{
				description: movieTitle,
			}],
			components: [{
				type: ComponentType.ActionRow,
				components: [{
					type: ComponentType.Button,
					style: ButtonStyle.Link,
					url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}`,
					label: 'Youtube search'
				}]
			}]
		});
	}



	/**
	 * Called when autocomplete interaction is created
	 * @param {AutocompleteInteraction} interaction The autocomplete interaction
	 */
	public autocompleteFn = (interaction: AutocompleteInteraction) => {
		const query = interaction.options.getString('title', true);

		this._fetchApi<SearchByTitle>(query).then(({ recordings }) => {

			if (recordings.length < 1) return;

			interaction.respond(recordings.map((reccord) => {
				return {
					name: `${reccord.title} (${reccord['artist-credit'][0].name})`,
					value: reccord.title

				};
			}));
		});

	};



	/**
	 * Fetch musicbrainz api
	 * @param {string} query The user input
	 * @returns {Promise<T>}
	 */
	private _fetchApi<T> (query: string): Promise<T> {

		/**
		 * API url: https://musicbrainz.org/
		 * endpoint: ws/2/recording
		 * params: {
		 * 	  query: (title|artist),
		 *    fmt: (json|xml)
		 * }
		 * headers: {
		 *    User-Agent: (appName/version)
		 * }
		 */

		return new Promise((resolve, reject) => {
			https.get({
				host: 'musicbrainz.org',
				path: `/ws/2/recording?query="${encodeURIComponent(query)}"&fmt=json`,
				headers: {
					'User-Agent': `${this.client.user?.username}/${this.client.user?.id}`
				},
			}, (res) => {

				let data = '';

				res.on('data', (chunck) => data += chunck);

				res.on('error', (err) => reject(err));

				res.on('end', () => resolve(JSON.parse(data)));
			});
		});

	}
}

interface SearchByTitle {
	recordings: Recording[];
}

interface Recording {
	title: string;
	'artist-credit': Artistcredit[];
}

interface Artistcredit {
	name: string;
}