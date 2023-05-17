import TallyTranspiledFiles from '../../src/tally-transpiled-files';
import { describe, expect, it } from 'vitest';

describe('tally transpiled files', () => {
    it('should make sure the transpiled directories are mjs and cjs', async () => {
        expect(TallyTranspiledFiles.transpiledOutDirs).toStrictEqual([
            'mjs',
            'cjs',
        ]);
    });
    it('should tally transpiled JavaScript files and Type Definition files to make sure that both JavaScript files and Type Definition exists in same folder', async () => {
        expect(TallyTranspiledFiles.tallyTranspiledFiles().isJsAndDts()).toBe(
            true
        );
    });
});
