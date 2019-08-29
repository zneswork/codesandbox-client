const execSync = require('child_process').execSync;

const isStaging = process.argv.includes('--staging');
const cliLocation = require.resolve('codesandbox');
const URL = `https://codesandbox.${isStaging ? `stream` : `io`}/api/graphql`;

const token = execSync(`node ${cliLocation} token`, {
  env: {
    CODESANDBOX_NODE_ENV: isStaging ? 'development' : 'production',
  },
  cwd: process.cwd(),
})
  .toString()
  .trim();

module.exports = {
  schema: [
    {
      [URL]: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  ],

  documents: `./src/**/*.gql`,
  overwrite: true,
  hooks: {
    afterAllFileWrite: [`prettier --write`],
  },
  generates: {
    './src/types.d.ts': {
      plugins: [`typescript`, `typescript-graphql-files-modules`],
    },
    './src/app/graphql/introspection-result.ts': {
      plugins: [`fragment-matcher`],
    },
  },
};
