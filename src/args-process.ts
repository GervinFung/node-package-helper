import TallyTranspiledFiles from './tally-transpiled-files';

const skipOutDir = (skip: string) => {
    const skipOutDirsFound = skip.split(',').flatMap((skipOutDir) => {
        const skipFound = TallyTranspiledFiles.transpiledOutDirs.find(
            (outDir) => outDir === skipOutDir
        );

        return !skipFound ? [] : [skipFound];
    });

    if (
        skipOutDirsFound.length === 2 &&
        skipOutDirsFound.every((outDir) => outDir === 'cjs' || outDir === 'mjs')
    ) {
        throw new Error(
            'targetted package is useless if it doesnt generate cjs or mjs folder and generate only type definition'
        );
    }

    return skipOutDirsFound;
};

const parseArgs = (args: ReadonlyArray<string>) => {
    const validArguments = ['--skip-outdir'] as const;

    const parseKeyValuePair = ({
        key,
        value,
    }: Readonly<{
        key: string;
        value: string;
    }>) => {
        switch (key) {
            case validArguments[0]: {
                return {
                    skipOutDir: skipOutDir(value),
                };
            }
        }
        throw new Error(`key of ${key} is not a valid argument`);
    };

    return args.slice(2).reduce(
        (arg, argument) => {
            const [key, value] = argument.split('=');
            return {
                ...arg,
                ...parseKeyValuePair({
                    key: key ?? '',
                    value: value ?? '',
                }),
            };
        },
        {
            skipOutDir: [],
        } as Readonly<ReturnType<typeof parseKeyValuePair>>
    );
};

export default parseArgs;
