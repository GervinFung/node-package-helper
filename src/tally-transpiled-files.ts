import path from 'path';
import fs from 'fs';

type Files = ReadonlyArray<string>;

const getFiles = (
    params: Readonly<{
        dir: string;
    }>
): Files =>
    fs.readdirSync(params.dir).flatMap((file) => {
        const filePath = path.join(params.dir, file);
        return !fs.statSync(filePath).isDirectory()
            ? filePath
            : getFiles({
                  dir: filePath,
              });
    });

const getBuild = <T extends string>(
    param: Readonly<{
        subDir: T;
        dir: string;
    }>
) => {
    const dir = path.resolve(path.join(param.dir, param.subDir));
    if (fs.statSync(dir).isDirectory()) {
        return getFiles({
            dir,
        });
    }
    throw new Error(`${dir} is not a directory, originated from ${param.dir}`);
};

const transpiledOutDirs = ['mjs', 'cjs'] as const;

const tallyTranspiledFiles = (dir: string) => {
    const [mjses] = transpiledOutDirs.map((type) =>
        getBuild({ dir, subDir: type }).map((file) =>
            file.replace(path.join(dir, type), '')
        )
    );

    const hasJs = (mjses ?? []).filter((file) => file.endsWith('.js'));
    const hasDts = (mjses ?? []).filter((file) => file.endsWith('.d.ts'));
    const hasSourceMap = (mjses ?? []).filter((file) =>
        file.endsWith('.js.map')
    );

    return (
        hasJs.length * 3 === hasJs.length + hasDts.length + hasSourceMap.length
    );
};

export { transpiledOutDirs, tallyTranspiledFiles };
