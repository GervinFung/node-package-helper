import process from 'process';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import { node } from '@poolofdeath20/eslint-config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	includeIgnoreFile(`${process.cwd()}/.gitignore`),
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	node,
	{
		ignores: ['test/dummy/**'],
	}
);
