const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dest = path.join(root, 'public', 'css');

const files = [
  {
    src: path.join(root, 'node_modules', 'materialize-css', 'dist', 'css', 'materialize.min.css'),
    name: 'materialize.min.css',
  },
  {
    src: path.join(root, 'node_modules', 'bulma', 'css', 'bulma.min.css'),
    name: 'bulma.min.css',
  },
];

fs.mkdirSync(dest, { recursive: true });

files.forEach(({ src, name }) => {
  fs.copyFileSync(src, path.join(dest, name));
  console.log(`Copiado ${name} -> public/css/`);
});
