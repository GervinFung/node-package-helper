import generatePackageJsonForTranspiledJavaScript from '../../src/generate-package-json';
import { describe, expect, it } from 'vitest';

describe('generate package.json for commonjs and module', () => {
    it.each(['cjs', 'mjs'] as const)(
        'should generate package.json for "%s"',
        async (type) => {
            const generator = generatePackageJsonForTranspiledJavaScript();
            const packageJson = await generator[type]();
            expect(packageJson).toBe(
                `generated package.json for ${
                    type === 'cjs' ? 'commonjs' : 'module'
                }`
            );
        }
    );
});
