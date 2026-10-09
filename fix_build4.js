const { execSync } = require('child_process');

async function build() {
  console.log('Building...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
}

build();
