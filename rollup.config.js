import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/lib/index.ts',
    output: [
        { file: pkg.module, format: 'es'}
    ],
    plugins: [
        resolve({
            browser: true,
            extensions: ['.js', '.jsx', '.css'],
            modulesOnly: true
        }),
        babel({
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-private-methods"
            ],
            exclude: ['node_modules/**'],
            runtimeHelpers: true
        }),
        minify({
            mangle: false
        })
    ]
};