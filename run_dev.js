const { execSync } = require('child_process');
execSync('rm -rf .next', { stdio: 'inherit' });
console.log('Done');
