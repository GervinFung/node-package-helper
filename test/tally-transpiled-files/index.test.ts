import fs from 'fs';
import path from 'path';

import { describe, expect, it } from 'vitest';

import {
	tallyTranspiledFiles,
	transpiledOutDirs,
} from '../../src/tally-transpiled-files';

describe('tally transpiled files', () => {
	it('should make sure the transpiled directories are mjs and cjs', () => {
		expect(transpiledOutDirs).toStrictEqual(['mjs', 'cjs']);
	});

	it('should tally transpiled JavaScript, Type Definition and Sourcemap files to make sure that all of the files exists in same folder', () => {
		expect(
			tallyTranspiledFiles(path.join('test', 'dummy', 'happy-case'))
		).toBe(true);
	});

	it.each(
		(() => {
			const sadCase = path.join('test', 'dummy', 'sad-case');
			return fs.readdirSync(sadCase).map((pathName) => {
				return path.join(sadCase, pathName);
			});
		})()
	)(
		'should return false as all JavaScript, Type Definition and Sourcemap files must exists in the same folder',
		(dir) => {
			expect(tallyTranspiledFiles(dir)).toBe(false);
		}
	);
});
