import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';

const isMinify = process.env.BUILD_MODE === 'minify';

export default {
  input: 'src/index.js',
  output: {
    file: isMinify ? 'dist/js/vue-lightgalleryjs.min.js' : 'dist/js/vue-lightgalleryjs.js',
    format: 'umd',
    name: 'VueLightgallery',
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
    }),
    babel({
      runtimeHelpers: true,
      externalHelpers: false,
    }),
    (isMinify && terser())
  ],
};
