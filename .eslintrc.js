module.exports = {
  extends: ['airbnb-base'],
  env: {
    node: true
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    'no-underscore-dangle': [0],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { code: 120 }],
    'quote-props': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 10 }],
    'global-require': [0],
    camelcase: ['off'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-mixed-operators': [
      'error',
      {
        groups: [['+', '-', '*', '/', '%', '**']],
        allowSamePrecedence: true
      }
    ]
  },
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'global-require': 'off'
      }
    }
  ]
};