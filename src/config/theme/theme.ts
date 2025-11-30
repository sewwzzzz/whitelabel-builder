import { ThemeEnum } from "@/model/theme/ThemeEnum";
import { darkTheme } from "naive-ui";

export const themeConfig = {
  [ThemeEnum.LIGHT]: null,
  [ThemeEnum.DARK]: darkTheme
}