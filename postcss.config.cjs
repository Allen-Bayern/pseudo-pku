module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-pxtorem')({
            propList: ['*'],
            mediaQuery: true,
            exclude: '',
        }),
    ],
};
