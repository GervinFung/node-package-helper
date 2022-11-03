import parseArgs from './args-process';
import generatePackageJsonForTranspiledJavaScript from './generate-package-json';
import TallyTranspiledFiles from './tally-transpiled-files';

const main = (
    params?: Readonly<{
        parseArgs: Parameters<typeof parseArgs>[number];
    }>
) => {
    const args = parseArgs(params?.parseArgs ?? []);

    const tallier = TallyTranspiledFiles.tallyTranspiledFiles();

    if (
        !args.skipOutDir.includes('dts') &&
        !tallier.isTypeScriptDeclarationOnly()
    ) {
        throw new Error(
            'dts folder contains non TypeScript type definition files'
        );
    }

    if (!tallier.isJavaScriptOnly()) {
        throw new Error(
            'mjs/cjs folder contains non JavaScrpt and Sourcemap files'
        );
    }

    const generator = generatePackageJsonForTranspiledJavaScript();

    generator.mjs();
    generator.cjs();
};

export default main;
