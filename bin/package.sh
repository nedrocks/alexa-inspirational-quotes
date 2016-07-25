DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "${DIR}/.."
webpack
cd "${DIR}/../dist/"
rm inspirationalQuotes.zip || true
zip inspirationalQuotes.zip inspirationalQuotes.js ../assets/quotes.txt
popd

echo 'Zip file available in dist/inspirationalQuotes.zip'
