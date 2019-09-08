module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
        // 'jest/globals': true
    },
    'parser': 'babel-eslint',
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'react-hooks'
        // 'jest'
    ],
    'rules': {
        'indent': [
            'error',
            2,
            { "SwitchCase": 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0,
        'react/prop-types': 0,
        'react-hooks/rules-of-hooks': 'error'
    }
}
