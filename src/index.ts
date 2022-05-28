import { config } from 'dotenv';
import { Bot } from './Classes/Bot';
import { Config } from './Types/config';
import staticConfig from '../config.json';

config();
new Bot(staticConfig as Config);