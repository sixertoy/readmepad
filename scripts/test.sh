#env NODE_ENV=test
#env COVERALLS_GIT_COMMIT=git_commit: git log -1 --pretty=%B
gulp bower
rm -rf ./spec/outputs
rm -rf ./spec/fixtures/nedb
mkdir ./spec/outputs
istanbul cover -x *.spec.js node_modules/mocha/bin/_mocha --report lcovonly -- -R spec ./spec/src/server/**/*
#istanbul cover -x *.spec.js node_modules/mocha/bin/_mocha --report lcovonly -- -R spec
karma start karma.conf.js --single-run
exit 0