rm -rf ./dist/docs
mdown --input "./src/docs/**/*.md" --output ./docs --header "./docs/assets/header.html" --footer "./docs/assets/footer.html"
github-markdown-css > ./docs/github-markdown.css
bootprint swagger ./docs/restapi.json ./dist/docs/v1
cp src/server.js ./dist/server.js
node index
exit 0
