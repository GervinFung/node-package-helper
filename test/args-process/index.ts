import argsProcess from '../../src/args-process';
import { describe, expect, it } from 'vitest';

const testArgsProcess = () =>
    describe('process arguments', () => {
        describe('process --skip-outdir arguments', () => {
            it('should process and throw error when "mjs" and "cjs" are skipped', async () => {
                expect(() =>
                    argsProcess([
                        'node',
                        'something.js',
                        `--skip-outdir=${['mjs', 'cjs'].join()}`,
                    ])
                ).toThrowError();
            });
            it.each(['mjs', 'cjs'] as const)(
                'should process and only transpiled outdir of "%s" must be skipped',
                async (outDir) => {
                    const skipOutDir = ['mjs', 'cjs', 'dts'].filter(
                        (skip) => skip !== outDir
                    );
                    expect(
                        argsProcess([
                            'node',
                            'something.js',
                            `--skip-outdir=${skipOutDir.join()}`,
                        ])
                    ).toStrictEqual({
                        skipOutDir,
                    });
                }
            );
        });
    });

export default testArgsProcess;
