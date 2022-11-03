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

namespace TallyTranspiledFiles {
    export const transpiledOutDirs = ['dts', 'mjs', 'cjs'] as const;

    export const tallyTranspiledFiles = () => {
        const dir = getDir();

        return {
            isTypeScriptDeclarationOnly: () => {
                const [dts] = transpiledOutDirs;
                return getBuild(dts)
                    .map((file) => file.replace(`${dir}/${dts}`, ''))
                    .every((file) => file.endsWith('.d.ts'));
            },
            isJavaScriptOnly: () => {
                const [, mjs, cjs] = transpiledOutDirs;
                const [mjses, cjses] = [mjs, cjs].map((type) =>
                    getBuild(type).map((file) =>
                        file.replace(`${dir}/${type}`, '')
                    )
                );
                return (mjses ?? []).every(
                    (file, index) =>
                        ((cjses ?? [])[index] === file &&
                            file.endsWith('.js')) ||
                        file.endsWith('.js.map')
                );
            },
        };
    };
}

export default TallyTranspiledFiles;
