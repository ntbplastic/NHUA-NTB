const { execSync } = require('child_process');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build ok');
} catch (e) {
  process.exit(1);
}
