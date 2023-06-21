import generatePackageJson from './generate-package-json';
import { tallyTranspiledFiles } from './tally-transpiled-files';

const main = () => {
    const dir = 'build';

    if (!tallyTranspiledFiles(dir)) {
        throw new Error(
            'mjs/cjs folder should contain JavaScrpt, Sourcemap and Type Definition files'
        );
    }

    generatePackageJson({
        dir,
        outDir: 'cjs',
    });
    generatePackageJson({
        dir,
        outDir: 'mjs',
    });
};

export default main;
