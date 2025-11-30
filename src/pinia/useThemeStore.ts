import { themeConfig } from "@/config/theme/theme";
import { ThemeEnum } from "@/model/theme/ThemeEnum";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const supportTheme = Object.values(ThemeEnum);
  const themeKey: string = 'theme';

  // state
  const theme = ref(ThemeEnum.DARK);

  // getter
  const naiveTheme = computed(() => {
    return themeConfig[theme.value]
  });

  // action
  function setTheme(newTheme: string) {
    if (isSupportTheme(newTheme)) {
      theme.value = newTheme;
      applyTheme();
    }
  }

  function initTheme() {
    const savedTheme = getThemefromLocal();
    if (savedTheme && isSupportTheme(savedTheme)) {
      setTheme(savedTheme);
    } else {
      applyTheme();
    }
  }

  function applyTheme() {
    const html = document.documentElement;
    html.classList.remove(`${themeKey}-${ThemeEnum.LIGHT}`, `${themeKey}-${ThemeEnum.DARK}`);
    html.classList.add(`${themeKey}-${theme.value}`);
    persistTheme();

  }

  // 私有方法，不暴露
  function isSupportTheme(newTheme: string): newTheme is ThemeEnum {
    return supportTheme.indexOf(newTheme as ThemeEnum) > -1;
  }

  function persistTheme() {
    localStorage.setItem(themeKey, theme.value);
  }

  function getThemefromLocal(): string | null {
    return localStorage.getItem(themeKey);
  }

  return { theme, naiveTheme, setTheme, initTheme };
})