module.exports = function (wallaby) {

    // Adding this allows replace to find the relative path - but still not the alias
    process.env.NODE_ENV = 'testing';
    process.env.NODE_PATH += require('path').delimiter
        + require('path').join(wallaby.projectCacheDir)
        + require('path').delimiter
        + require('path').join(wallaby.projectCacheDir, 'client/components');


    process.env.BABEL_ENV = 'test';

    return {
        files: [
          'client/**/*.js*',
          '!client/**/*.spec.js*'
        ],

        tests: [
          'client/**/*.spec.js*'
        ],

        compilers: {
            '**/*.js?(*)': wallaby.compilers.babel()
        },

        bootstrap: function (wallaby) {
          const moduleAlias = require('module-alias');
          moduleAlias.addAliases({
            'sheep': wallaby.projectCacheDir + '/client/components/core/utils.js'
          });
          function setupWindow() {
            const jsdom = require('jsdom')
            const {JSDOM} = jsdom

            const dom = new JSDOM('<!doctype html><html><body></body></html>', {
              url: 'https://example.com'
            })

            global.document = dom.window.document
            global.window = document.defaultView
            global.navigator = global.window.navigator
            global.window.localStorage = {
              getItem: () => {},
              setItem: () => {}
            }
          }

          // adding this allows the window issue to go away
          // but creates a cannot read property of cache
          setupWindow()
          require('testdouble').reset();
        },

        testFramework: 'mocha',

        env: {
            type: 'node',
            runner: 'node'
        },

        debug:true
    };
};
