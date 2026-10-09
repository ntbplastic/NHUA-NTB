const { execSync } = require('child_process');

console.log('Building Next.js app again...');
try {
  execSync('rm -rf .next', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build successful!');
} catch (error) {
  console.error('Build failed with error:', error.message);
  process.exit(1);
}
