import path from 'path';
import fs from 'fs';

type Files = ReadonlyArray<string>;

const getFiles = (
	params: Readonly<{
		dir: string;
	}>
): Files => {
	return fs.readdirSync(params.dir).flatMap((file) => {
		const filePath = path.join(params.dir, file);
		return !fs.statSync(filePath).isDirectory()
			? filePath
			: getFiles({
					dir: filePath,
				});
	});
};

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

const tallyFiles = (type: 'js' | 'jsx') => {
	return (jses: ReadonlyArray<string>) => {
		const hasJs = jses.filter((file) => {
			return file.endsWith(`.${type}`);
		});
		const hasDts = jses.filter((file) => {
			return file.endsWith('.d.ts');
		});
		const hasSourceMap = jses.filter((file) => {
			return file.endsWith(`.${type}.map`);
		});

		return (
			hasJs.length &&
			hasJs.length * 3 ===
				hasJs.length + hasDts.length + hasSourceMap.length
		);
	};
};

const tallyJsFiles = tallyFiles('js');

const tallyJsxFiles = tallyFiles('jsx');

const tallyTranspiledFiles = (dir: string) => {
	const files = transpiledOutDirs.map((type) => {
		return getBuild({ dir, subDir: type }).map((file) => {
			return file.replace(path.join(dir, type), '');
		});
	});

	return files.every(tallyJsFiles) || files.every(tallyJsxFiles);
};

export { transpiledOutDirs, tallyTranspiledFiles };
