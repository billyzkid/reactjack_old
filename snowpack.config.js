export default {
  mount: {
    client: { url: '/' }
  },
  plugins: [
    '@snowpack/plugin-sass',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv'
  ],
  routes: [
  ],
  optimize: {
    //bundle: true,
    //minify: true,
  },
  packageOptions: {
  },
  devOptions: {
    port: 3000,
    open: 'default',
    hmr: true
  },
  buildOptions: {
    //watch: true,
  }
};
