import fs from 'fs';
import getDir from './dir';
import TallyTranspiledFiles from './tally-transpiled-files';

const generate = async (
    outDir: Exclude<
        typeof TallyTranspiledFiles['transpiledOutDirs'][number],
        'dts'
    >
) =>
    new Promise<string | NodeJS.ErrnoException>((resolve, reject) => {
        const type = outDir === 'mjs' ? 'module' : 'commonjs';
        fs.writeFile(
            `${getDir()}/${outDir}/package.json`,
            JSON.stringify({
                type,
            }),
            (error) =>
                error
                    ? reject(error)
                    : resolve(`generated package.json for ${type}`)
        );
    });

const generatePackageJsonForTranspiledJavaScript = () => ({
    mjs: () => generate('mjs'),
    cjs: () => generate('cjs'),
});

export default generatePackageJsonForTranspiledJavaScript;
