import path from 'path';

import { describe, expect, it } from 'vitest';

import generatePackageJson from '../../src/generate-package-json';

describe('generate package.json for commonjs and module', () => {
	it.each(['cjs', 'mjs'] as const)(
		'should generate package.json for "%s"',
		async (type) => {
			expect(
				await generatePackageJson({
					dir: path.join('test', 'dummy', 'happy-case'),
					outDir: type,
				})
			).toBe(
				`generated package.json for ${
					type === 'cjs' ? 'commonjs' : 'module'
				}`
			);
		}
	);
});
