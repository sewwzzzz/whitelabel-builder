import type { ThemeType } from "@/model/ThemeType";

export default class ThemeManager {
  private static currentTheme: ThemeType = 'light';
  // 切换主题
  static toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  static setCurrentTheme(theme: ThemeType) {
    this.currentTheme = theme;
    this.applyTheme();
  }

  // 获取当前主题
  static getCurrentTheme(): ThemeType {
    return this.currentTheme;
  }

  // 初始化主题
  static initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setCurrentTheme(savedTheme as ThemeType);
    } else {
      this.applyTheme();
    }
  }

  // 应用当前主题
  private static applyTheme(): void {
    const html = document.documentElement;
    html.classList.remove('theme-light', 'theme-dark');
    html.classList.add(`theme-${this.currentTheme}`);

    this.persistTheme();
  }

  // 主题持久化
  private static persistTheme(): void {
    localStorage.setItem('theme', this.currentTheme);
  }
}