import generatePackageJsonForTranspiledJavaScript from './generate-package-json';
import { tallyTranspiledFiles } from './tally-transpiled-files';

const main = () => {
    const tallier = tallyTranspiledFiles();

    if (!tallier.isJsAndDts()) {
        throw new Error(
            'mjs/cjs folder should contain JavaScrpt, Sourcemap and Type Definition files'
        );
    }

    const generator = generatePackageJsonForTranspiledJavaScript();

    generator.mjs();
    generator.cjs();
};

export default main;
