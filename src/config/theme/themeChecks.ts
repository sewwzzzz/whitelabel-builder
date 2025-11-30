import { ThemeEnum } from "@/model/theme/ThemeEnum";

export const SWITCH_CONFIG = {
  CHECKED: ThemeEnum.DARK,
  UNCHECKED: ThemeEnum.LIGHT,
  DEFAULT: ThemeEnum.LIGHT
} as const;