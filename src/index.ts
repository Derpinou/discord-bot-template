import 'dotenv/config';
import { Bot } from './Classes/Bot';
import { Config } from './Types/config';
import staticConfig from '../config.json';

new Bot(staticConfig as Config);