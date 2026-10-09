const { execSync } = require('child_process');

console.log('Testing npm run lint...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('Lint successful!');
} catch (error) {
  console.error('Lint failed!');
  process.exit(1);
}
