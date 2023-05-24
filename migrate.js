/**
 * Create migration file
 * node migrate.js create --name MIGRATION_NAME.ts
 */
require('ts-node').register({
    files: true,
    compilerOptions: {
        module: 'commonjs',
    },
});

require('./config/umzug')
    .migrator.runAsCLI()
    .then(() => {
        process.exit();
    });
