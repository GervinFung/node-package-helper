import generatePackageJsonForTranspiledJavaScript from '../../src/generate-package-json';
import { describe, expect, it } from 'vitest';

const testGeneratePackage = () => {
    describe('generate package.json for commonjs and module', () => {
        it.each(['cjs', 'mjs'] as const)(
            'should generate package.json for "%s"',
            async (type) => {
                const generator = generatePackageJsonForTranspiledJavaScript();
                const packageJson = await generator[type]();
                expect(typeof packageJson).toBe('string');
            }
        );
    });
};

export default testGeneratePackage;
