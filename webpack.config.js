const path = require('path');

module.exports = [
    {
        entry: './dist/Classes/Mage.js',
        output: {
            filename: 'Mage.js',
            path: path.resolve(__dirname, 'dist/build')
        }
    },
    {
        entry: './dist/Classes/Warrior.js',
        output: {
            filename: 'Warrior.js',
            path: path.resolve(__dirname, 'dist/build')
        }
    },
    {
        entry: './dist/Classes/Priest.js',
        output: {
            filename: 'Priest.js',
            path: path.resolve(__dirname, 'dist/build')
        }
    },
    {
        entry: './dist/Classes/Ranger.js',
        output: {
            filename: 'Ranger.js',
            path: path.resolve(__dirname, 'dist/build')
        }
    },
]