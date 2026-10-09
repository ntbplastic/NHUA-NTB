const { execSync } = require('child_process');

async function build() {
  console.log('Cleaning up...');
  execSync('rm -rf .next', { stdio: 'inherit' });
  execSync('rm -rf node_modules/.cache', { stdio: 'inherit' });
  
  console.log('Building...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
}

build();
