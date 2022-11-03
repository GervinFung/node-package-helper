import testCases from 'cases-of-test';
import testArgsProcess from './args-process';
import testGeneratePackage from './generate-package-json';
import testTallyTranspiledFiles from './tally-transpiled-files';

testCases({
    tests: [
        [testTallyTranspiledFiles],
        [testGeneratePackage],
        [testArgsProcess],
    ],
});
