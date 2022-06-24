import transcripts from "@/helpers/transcripts";
import dayjs from "@/helpers/modules/dayjs";

export default async () => {
    await transcripts();
    dayjs();
};