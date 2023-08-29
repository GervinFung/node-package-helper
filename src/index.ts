import generatePackageJson from './generate-package-json';
import { tallyTranspiledFiles } from './tally-transpiled-files';

const main = async () => {
	const dir = 'build';

	if (!tallyTranspiledFiles(dir)) {
		throw new Error(
			'mjs/cjs folder should contain JavaScrpt, Sourcemap and Type Definition files'
		);
	}

	const cjs = await generatePackageJson({
		dir,
		outDir: 'cjs',
	});

	console[typeof cjs === 'string' ? 'log' : 'error'](cjs);

	const mjs = await generatePackageJson({
		dir,
		outDir: 'mjs',
	});

	console[typeof mjs === 'string' ? 'log' : 'error'](mjs);
};

export default main;
