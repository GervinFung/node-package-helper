import path from 'path';

const getDir = () =>
    JSON.parse(process.env.NODE_PACKAGE_HELPER ?? 'false') !== true
        ? 'build'
        : path.join('test', 'dummy');

export default getDir;
