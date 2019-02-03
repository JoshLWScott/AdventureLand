const path = require('path');

module.exports = [
    {
        entry: './dist/Classes/Mage.js',
        output: {
            filename: 'Mage.js',
            path: path.resolve(__dirname, 'dist/build')
        }
    },
]