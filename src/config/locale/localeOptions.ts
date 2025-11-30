import { LocaleEnum } from "@/types/locale/LocaleEnum";

export const options: Array<{ label: string, value: LocaleEnum }> = [
  {
    label: "English",
    value: LocaleEnum.EN
  },
  {
    label: "简体中文",
    value: LocaleEnum.ZH
  }
] as const;