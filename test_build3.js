const { execSync } = require('child_process');

console.log('Cleaning Next.js cache...');
execSync('rm -rf .next', { stdio: 'inherit' });

console.log('Building Next.js app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build successful!');
} catch (error) {
  console.error('Build failed with error:', error.message);
  process.exit(1);
}
