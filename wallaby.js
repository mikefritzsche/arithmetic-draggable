module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.js'
        ],

        tests: [
            'src/**/*spec.js'
        ]
        // for node.js tests you need to set env property as well
        // https://wallabyjs.com/docs/integration/node.html
    };
};