const { execSync } = require('child_process');

console.log('Cleaning Next.js cache...');
execSync('rm -rf node_modules', { stdio: 'inherit' });
execSync('npm install', { stdio: 'inherit' });
