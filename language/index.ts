import zhComponentLanguage from './zh/component';
import zhIndexLanguage from './zh/index';
import { language as enComponentLanguage } from './en/component';
import { language as enIndexLanguage } from './en/index';

const languageDist = {
  'zh': {
    component: zhComponentLanguage,
    index: zhIndexLanguage,
  },
  'en': {
    component: enComponentLanguage,
    index: enIndexLanguage,
  },
}

export default languageDist;