import snowpack from 'snowpack';
import snowpackUserConfig from '../snowpack.config.js';

async function build() {
  const snowpackConfig = snowpack.createConfiguration(snowpackUserConfig);
  const snowpackBuildResult = await snowpack.build({ config: snowpackConfig });
}

build();
