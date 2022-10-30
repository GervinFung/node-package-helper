import generatePackageJsonForTranspiledJavaScript from './generate-package-json';
import tallyTranspiledFiles from './tally-transpiled-files';

const main = () => {
    const tallier = tallyTranspiledFiles();
    if (!tallier.isTypeScriptDeclarationOnly()) {
        throw new Error(
            'dts folder contains non TypeScript type definition files'
        );
    }
    if (!tallier.isJavaScriptAndSourceMapOnly()) {
        throw new Error(
            'mjs/cjs folder contains non JavaScrpt and Sourcemap files'
        );
    }
    const generator = generatePackageJsonForTranspiledJavaScript();
    generator.mjs();
    generator.cjs();
};

export default main;
