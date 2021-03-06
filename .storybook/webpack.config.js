const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');
//dont need stories path if you have your stories inside your //components folder
module.exports = ({config}) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [SRC_PATH, STORIES_PATH],
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    configFileName: './.storybook/tsconfig.json'
                }
            },
            {loader: require.resolve('react-docgen-typescript-loader')}
        ]
    });

    config.module.rules.push({
        test: /\.less$/,
        use: [
            {
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader", // compiles Less to CSS
                options: {
                    javascriptEnabled: true
                }
            }
        ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};