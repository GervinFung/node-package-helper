import fs from 'fs';
import path from 'path';
import { transpiledOutDirs } from './tally-transpiled-files';

const generate = async (
    params: Readonly<{
        dir: string;
        outDir: (typeof transpiledOutDirs)[number];
    }>
) =>
    new Promise<string | NodeJS.ErrnoException>((resolve, reject) => {
        const type = params.outDir === 'mjs' ? 'module' : 'commonjs';
        fs.writeFile(
            path.join(params.dir, params.outDir, 'package.json'),
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

const generatePackageJson = (param: Parameters<typeof generate>[number]) =>
    generate(param);

export default generatePackageJson;
