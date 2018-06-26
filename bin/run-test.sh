parcel build \
  --no-minify \
  -d ./puretest/.dist/ \
  -o test-bundle.js $2 \
  --no-source-maps && \
hcdev run-js $1 puretest/.dist/test-bundle.js