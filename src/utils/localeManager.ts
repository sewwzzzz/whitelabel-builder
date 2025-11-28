import type { LocaleType } from "@/model/locale/LocaleEnum";

export default class LocaleManager {
  private static currentLocale: LocaleType = 'en';

  // 获取当前语言
  static getCurrentLocale(): LocaleType {
    return this.currentLocale;
  }

  // 设置当前语言
  static setCurrentLocale(locale: LocaleType) {
    this.currentLocale = locale;
    this.persistLocale();
  }

  // 切换语言
  static toggleLocale() {
    this.currentLocale = this.currentLocale === 'zh' ? 'en' : 'zh';
    this.persistLocale();
  }

  // 初始化当前主题
  static initLocale(): void {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      this.setCurrentLocale(savedLocale as LocaleType);
    }
  }

  // 持久化当前语言
  private static persistLocale(): void {
    localStorage.setItem('locale', this.currentLocale);
  }
} 
