import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from "rollup-plugin-terser";

const input = 'src/lib/index.ts';

const basicPlugins = [
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
    })
];

const minPlugins = [
    ...basicPlugins,
    minify(),
    terser(),
];

export default [
    {
        input: input,
        output: [
            {file: pkg.main, format: 'cjs'}
        ],
        plugins: minPlugins
    },
    {
        input: input,
        output: [
            {file: pkg.module, format: 'es'}
        ],
        plugins: basicPlugins
    },
    {
        input: input,
        output: [
            {file: 'dist/es/magicist.mjs', format: 'es'}
        ],
        plugins: minPlugins
    },
    {
        input: input,
        output: [
            {file: pkg.unpkg, format: 'umd', name: 'magicist.umd'}
        ],
        plugins: minPlugins
    }
];