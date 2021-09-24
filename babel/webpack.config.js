const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    },
    entry: {
        app: './src/script.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'script.bundle.js'
        
    },
    module: {
        rules: [{
            test: /\.js?$/, //\escape char, ?makes it optional, $means it's at the end. So, any .js file
            exclude: [/bower_components/, /node_modules/],
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }

        }]
    } 
}