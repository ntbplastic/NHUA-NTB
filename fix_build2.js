const { execSync } = require('child_process');
try {
  execSync('rm -rf .next', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
} catch (e) {
  process.exit(1);
}
