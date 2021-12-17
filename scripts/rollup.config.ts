import fs from 'fs'
import { resolve } from 'path'
import esbuild, { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import type { OutputOptions, Plugin, RollupOptions } from 'rollup'
import fg from 'fast-glob'
import { packages } from '../meta/packages'
import { functions } from '../meta/function-indexes'

const configs: RollupOptions[] = []

const esbuildPlugin = esbuild()

const dtsPlugin = [
    dts(),
]

const externals = [
    'vue-demi',
    '@vueuse/shared',
]

const esbuildMinifer = (options: ESBuildOptions) => {
    const { renderChunk } = esbuild(options)

    return {
        name: 'esbuild-minifer',
        renderChunk,
    }
}

for (const {name, external, submodules, iife, build, cjs, mjs, dts, target } of packages) {
    if (build === false)
        continue

    const functionNames = ['index']

    if (submodules)
        functionNames.push(...fg.sync('*/index.ts', { cwd: resolve(`packages/${name}`) }).map(i => i.split('/')[0]))

    for (const fn of functionNames) {
        const input = fn === 'index'
            ? `packages/${name}/index.ts`
            : `packages/${name}/${fn}/index.ts`

        const info = functions.find(i => i.name === fn)

        const output: OutputOptions[] = []

        if (mjs !== false) {
            output.push({
                file: `packages/${name}/dist/${fn}.mjs`,
                format: 'es',
            })
        }

        if (cjs !== false) {
            output.push({
                file: `packages/${name}/dist/${fn}.cjs`,
                format: 'cjs',
            })
        }

        configs.push({
            input,
            output,
            plugins: [
                target
                    ? esbuild({ target })
                    : esbuildPlugin,
            ],
            external: [
                ...externals,
                ...(external || []),
            ],
        })

        if (dts !== false) {
            configs.push({
                input,
                output: {
                    file: `packages/${name}/dist/${fn}.d.ts`,
                    format: 'es',
                },
                plugins: dtsPlugin,
                external: [
                    ...externals,
                    ...(external || []),
                ],
            })
        }

        if (info?.component) {
            configs.push({
                input: `packages/${name}/${fn}/component.ts`,
                output: [
                    {
                        file: `packages/${name}/dist/${fn}/component.cjs`,
                        format: 'cjs',
                    },
                    {
                        file: `packages/${name}/dist/${fn}/component.mjs`,
                        format: 'es',
                    },
                ],
                plugins: [
                    esbuildPlugin,
                ],
                external: [
                    ...externals,
                    ...(external || []),
                ],
            })

            configs.push({
                input: `packages/${name}/${fn}/component.ts`,
                output: {
                    file: `packages/${name}/dist/${fn}/component.d.ts`,
                    format: 'es',
                },
                plugins: dtsPlugin,
                external: [
                    ...externals,
                    ...(external || []),
                ],
            })
        }
    }
}

export default configs
