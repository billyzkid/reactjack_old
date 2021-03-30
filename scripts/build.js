import snowpack from 'snowpack';
import snowpackUserConfig from '../snowpack.config.js';

async function build() {
  const snowpackConfig = snowpack.createConfiguration(snowpackUserConfig);
  const snowpackBuildResult = await snowpack.build({ config: snowpackConfig });

  // TODO: Remove lines 10-12 below when using Snowpack ^3.1.2 once scss
  // bug is resolved: https://github.com/snowpackjs/snowpack/issues/3042
  if (!snowpackConfig.buildOptions.watch) {
    process.exit();
  }
}

build();
