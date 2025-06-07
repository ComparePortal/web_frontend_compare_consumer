// const isProd = process.env.NODE_ENV === 'production';

const nextSettings = {
    // assetPrefix: 'https://yashra.azureedge.net',
    optimizeFonts: false,
    // crossOrigin: 'anonymous',
    // disable eslint
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Change your site title here
    env: {
        title: 'Comparor',
        titleDescription: '--compare the products  ',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yashra.azureedge.net',
                // port: '8000',
                pathname: '/images/**',
            },
        ],
    },
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });
// module.exports = withBundleAnalyzer({
//     nextSettings,
// });
// module.exports = nextSettings;
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
    // modifyVars: { '@primary-color': '#04f' }, // optional
    lessVarsFilePath: './src/styles/variables.less', // optional
    lessVarsFilePathAppendToEndOfContent: false, // optional
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {
        // ...
        mode: 'local',
        localIdentName: '[hash:base64:8]',
        // but you can rewritten getLocalIdentFn
        exportLocalsConvention: 'camelCase',
        exportOnlyLocals: false,
        // ...
        getLocalIdent: (context, localIdentName, localName, options) => {
            return 'whatever_random_class_name';
        },
    },

    // Other Config Here...
    ...nextSettings,

    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };

        return config;
    },
});
