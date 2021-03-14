import snowpack from 'snowpack';
import snowpackUserConfig from '../snowpack.config.js';

async function build() {
  const config = snowpack.createConfiguration(snowpackUserConfig);
  const buildResult = await snowpack.build({ config });

  if (!config.buildOptions.watch) {
    process.exit();
  }
}

build();
