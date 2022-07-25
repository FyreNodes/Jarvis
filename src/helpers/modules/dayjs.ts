import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export default () => {
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
};
