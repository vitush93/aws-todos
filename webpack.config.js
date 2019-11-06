module.exports = {
    cache: true,
    target: 'node',
    mode: 'production',
    context: __dirname,
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.(ts)|(js)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.gql', '.graphql', '.mjs'],
        modules: ['node_modules'],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: `${__dirname}/dist`,
        filename: '[name]/index.js',
        sourceMapFilename: '[name]/index.js.map',
    },
    entry: {
        'todos-api': './src/infrastructure/todo-api/graphql/index.ts',
    },
    externals: {
        'aws-sdk': 'aws-sdk',
    },
};
