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
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
            modulesOnly: true
        }),
        babel({
            presets: ["@babel/typescript"],
            plugins: [
                "@babel/plugin-proposal-class-properties",
            ],
            exclude: ['node_modules/**'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            runtimeHelpers: true
        }),
        minify({
            mangle: false
        })
    ]
};