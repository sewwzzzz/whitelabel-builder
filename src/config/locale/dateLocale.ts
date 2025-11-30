import { LocaleEnum } from "@/types/locale/LocaleEnum";
import { dateEnUS, dateZhCN } from "naive-ui";

export const naiveDateLocaleConfig = {
  [LocaleEnum.ZH]: dateZhCN,
  [LocaleEnum.EN]: dateEnUS
}