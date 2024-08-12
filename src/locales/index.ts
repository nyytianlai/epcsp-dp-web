const locales = {
  'zh-CN': import.meta.glob(`./zh-CN/**/*.ts`, { eager: true }),
  'en-US': import.meta.glob(`./en-US/**/*.ts`, { eager: true })
};

const messages: { [key: string]: any } = {};
Object.keys(locales).forEach((language) => {
  let obj = locales[language];
  obj = Object.entries(obj).reduce((total, locale: any) => {
    const module = locale[0].replace(`./${language}/`, '').replace('.ts', '');
    total[module] = locale[1].default;
    return total;
  }, {});
  messages[language] = obj;
});

export default messages;
