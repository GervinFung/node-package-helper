import tallyTranspiledFiles from '../../src/tally-transpiled-files';
import { describe, expect, it } from 'vitest';

const testTallyTranspiledFiles = () => {
    describe('tally transpiled files', () => {
        it('should make sure the transpiled directories are mjs, cjs and dts', async () => {
            expect(tallyTranspiledFiles().transpiledOutDirs).toStrictEqual([
                'dts',
                'mjs',
                'cjs',
            ]);
        });
        it('should tally transpiled JavaScript files to make sure there is only JavaScript files and cjs and mjs have the same files', async () => {
            expect(tallyTranspiledFiles().isJavaScriptAndSourceMapOnly()).toBe(
                true
            );
        });
        it('should ensure transpiled type definitions contains only TypeScript files', async () => {
            expect(tallyTranspiledFiles().isTypeScriptDeclarationOnly()).toBe(
                true
            );
        });
    });
};

export default testTallyTranspiledFiles;
