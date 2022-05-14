import { connect } from 'mongoose';
import { grey, yellow, white } from 'chalk';

connect(`${process.env.MONGO_URL}/bot`).then(() => console.log(`${grey.bold('[')}${yellow.bold('DATABASE')}${grey.bold(']')} ${white('Successfully connected to the database.')}`));

export default () => {};
