import { IApi } from 'alita';

export default (api: IApi) => {
  api.onDevCompileDone((opts) => {
    // console.log('> onDevCompileDone', opts.isFirstCompile);
  });
  api.onBuildComplete((opts) => {
    // console.log('> onBuildComplete', opts.isFirstCompile);
  });
};
