rm -rf ./spec/outputs
rm -rf ./spec/fixtures/nedb
mkdir ./spec/outputs
istanbul cover -x *.spec.js node_modules/mocha/bin/_mocha --report lcovonly -- -R spec ./spec/src/server/**/*
rm -rf ./project_model_spec
exit 0