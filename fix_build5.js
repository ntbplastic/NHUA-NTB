const { execSync } = require('child_process');

async function build() {
  console.log('Cleaning up...');
  execSync('rm -rf .next', { stdio: 'inherit' });
  
  console.log('Building...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
}

build();
