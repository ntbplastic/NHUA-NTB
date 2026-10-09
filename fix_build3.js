const { execSync } = require('child_process');

async function build() {
  console.log('Cleaning up...');
  execSync('rm -rf .next node_modules/.cache', { stdio: 'inherit' });
  
  console.log('Installing dependencies to ensure they are fresh...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Building...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
}

build();
