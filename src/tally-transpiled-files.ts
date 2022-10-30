import path from 'path';
import fs from 'fs';
import getDir from './dir';

type Files = ReadonlyArray<string>;

const getFiles = ({
    dir,
}: Readonly<{
    dir: string;
}>): Files =>
    fs.readdirSync(dir).flatMap((file) => {
        const filePath = `${dir}/${file}`;
        return !fs.statSync(filePath).isDirectory()
            ? filePath
            : getFiles({
                  dir: filePath,
              });
    });

const getBuild = <T extends string>(subDir: T) => {
    const dir = path.resolve(`${getDir()}/${subDir}`);
    if (fs.statSync(dir).isDirectory()) {
        return getFiles({
            dir,
        });
    }
    throw new Error(`${dir} is not a directory, originated from ${subDir}`);
};

const guardElem = (strings: ReadonlyArray<ReadonlyArray<string>>) => {
    const [e1, e2, e3] = strings;
    if (strings.length === 3 && e1 && e2 && e3) {
        return [e1, e2, e3] as const;
    }
    throw new Error(
        'There must be exactly 3 elements (dts, mjs and cjs) from build, that transpiler output directory'
    );
};

const tallyTranspiledFiles = () => {
    const transpiledOutDirs = ['dts', 'mjs', 'cjs'] as const;
    const dir = getDir();
    const [dts, mjs, cjs] = guardElem(
        transpiledOutDirs.map((type) =>
            getBuild(type).map((file) => file.replace(`${dir}/${type}`, ''))
        )
    );

    const packageJson = 'package.json';

    return {
        transpiledOutDirs,
        isTypeScriptDeclarationOnly: () =>
            dts.every((file) => file.endsWith('.d.ts')),
        isJavaScriptAndSourceMapOnly: () =>
            mjs.filter((file) => file.endsWith(packageJson)).length === 1 &&
            mjs
                .filter((file) => !file.endsWith(packageJson))
                .every(
                    (file, index) =>
                        cjs[index] === file &&
                        (file.endsWith('.js') || file.endsWith('.js.map'))
                ),
    };
};

export default tallyTranspiledFiles;
