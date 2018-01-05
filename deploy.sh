set -E
rm -rf _site
npm run build
yarn install
cp node_modules/netlify-cms/dist/cms.js admin/cms.js
cp node_modules/netlify-cms/dist/cms.css admin/cms.css
jekyll build
