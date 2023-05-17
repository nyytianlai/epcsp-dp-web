import components from '@/components/index.ts';
export default (app) => {
  for (const componentItme in components) {
    app.component(componentItme, components[componentItme]);
  }
};
