import fs from 'fs';
import path from 'path';
import getDir from './dir';
import { transpiledOutDirs } from './tally-transpiled-files';

const generate = async (outDir: (typeof transpiledOutDirs)[number]) =>
    new Promise<string | NodeJS.ErrnoException>((resolve, reject) => {
        const type = outDir === 'mjs' ? 'module' : 'commonjs';
        fs.writeFile(
            path.join(getDir(), outDir, 'package.json'),
            JSON.stringify(
                {
                    type,
                },
                undefined,
                4
            ),
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
