import { connect } from 'mongoose';
import { grey, yellow, white } from 'chalk';

let dev: boolean = false;
if (process.env.NODE_ENV === 'development') dev = true;
connect(process.env.MONGO_URL, { dbName: dev ? 'dev' : 'bot' }).then(() => console.log(`${grey.bold('[')}${yellow.bold('DATABASE')}${grey.bold(']')} ${white('Successfully connected to the database.')}`));

export default () => {};
