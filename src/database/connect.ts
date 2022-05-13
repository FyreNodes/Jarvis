import { connect } from 'mongoose';

connect(process.env.MONGO_URL);

export default () => {};
