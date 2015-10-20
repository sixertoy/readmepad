gulp bower
rm -rf ./spec/outputs
rm -rf ./spec/fixtures/nedb
mkdir ./spec/outputs
karma start karma.conf.js --single-run
rm -rf ./project_model_spec
exit 0