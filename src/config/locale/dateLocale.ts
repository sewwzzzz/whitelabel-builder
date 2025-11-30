import { LocaleEnum } from "@/model/locale/LocaleEnum";
import { dateEnUS, dateZhCN } from "naive-ui";

export const naiveDateLocaleConfig = {
  [LocaleEnum.ZH]: dateZhCN,
  [LocaleEnum.EN]: dateEnUS
}