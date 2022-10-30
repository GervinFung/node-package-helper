const getDir = () =>
    JSON.parse(process.env.NODE_PACKAGE_HELPER ?? 'false') !== true
        ? 'build'
        : 'test/dummy';

export default getDir;
