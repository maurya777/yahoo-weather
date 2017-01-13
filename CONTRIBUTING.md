# Setting up your Text Editor

## Install EditorConfig

[http://editorconfig.org/](http://editorconfig.org/)


## ESLint for SublimeText 3

1. Install SublimeLinter via Package Control
  * Make sure to at least have the Sublimter Settings - User config to run at least
```
"lint_mode": "load/save",
```

2. Install SublimeLinter-contrib-eslint via Package Control

3. Add the following settings to your yahoo-weather.sublime-project

```
"SublimeLinter":{
        "linters":{
            "eslint":{
                "excludes":[
                    "dist/*",
                    "node_modules/*"
                ]
            },
            "jshint":{
                "@disable": true
            }
        }
    }
```

# Debug a Unit Test

Insall karma command line global so that you can run karma from the command line and launch browsers

```
npm install -g karma-cli
```

## Run in Chrome
```
karma start karma.conf.js --env=test-debug
```

## Run in Firefox
```
karma start karma.conf.js --env=test-debug --browsers=Firefox
```

# Other Commands

## clean
clean the dist folder
```
npm run clean
```

## copy
copy assets into dist
```
npm run copy
```

## dist
build bundles and copy assets into dist folder
```
npm run dist
```

## lint - eslint and sass-lint
```
npm run lint
```

## release:major
```
npm run relase:major
```

## release:minor
```
npm run relase:minor
```

## release:patch
```
npm run relase:patch
```

## serve
Same as "npm start"
```
npm run serve
```

## serve:dist
Serve/start but use the production(dist) build
```
npm run serve
```

## start
Start the dev server
```
npm start
```

## test
Run the unit and integration tests
```
npm test
```

## test:watch
Run tests each time a file change is detected
```
npm test:watch
```

## test:debug
Keeps the test runner open and disables code coverage so you can use the browser's debugger.  Defaults to Chrome.
```
npm run-script test:debug
```
After it starts, you'll need to press the debug button in Karma's browser instance.  If you open the developer console, the project source files will appear under `webpack://` in the sources tab.

## grep
Run only specific tests by filtering using a Grep

1. If the 'it' block in your test has '#className' tag, then below is command
```
karma start --grep '#className'
```

2. If you want to run all tests in describe('MainComponent', ()…..” block, then below is command
```
karma start --grep 'MainComponent'
```

3. If you want to run all tests in 'it' blocks that has word 'should', then below is command
```
karma start --grep 'should'
```

You can also chain grep onto npm test scripts.  The following will run the the tests in debug mode, but filtered for canvas:
```
npm run test:debug -- --grep canvas
```
