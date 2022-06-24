import transcripts from "./transcripts";
import dayjs from "./modules/dayjs";

export default async () => {
    await transcripts();
    dayjs();
};