import fs from 'fs';
import getDir from './dir';
import tallyTranspiledFiles from './tally-transpiled-files';

const generate = async (
    outDir: Exclude<
        ReturnType<typeof tallyTranspiledFiles>['transpiledOutDirs'][number],
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
                    : resolve(`${type} package.json generated`)
        );
    });

const generatePackageJsonForTranspiledJavaScript = () => ({
    mjs: () => generate('mjs'),
    cjs: () => generate('cjs'),
});

export default generatePackageJsonForTranspiledJavaScript;
