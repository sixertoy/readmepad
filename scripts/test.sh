# !/bin/sh
#env NODE_ENV=test
#env COVERALLS_GIT_COMMIT=git_commit: git log -1 --pretty=%B
rm -rf ./spec/outputs
rm -rf ./spec/fixtures/nedb
mkdir ./spec/outputs

if [ -n "$1" ]; then
    if [ "$1" == "server" ]; then
        # -----------------------------------------------------
        #
        # Test pour le l'application NodeJS
        #
        # -----------------------------------------------------
        istanbul cover -x *.spec.js node_modules/mocha/bin/_mocha --report lcovonly -- -R spec ./spec/src/server/**/*
    elif [ "$1" == "front" ]; then
        # -----------------------------------------------------
        #
        # Test pour le front AngularJS
        #
        # -----------------------------------------------------
        karma start karma.conf.js --single-run
    else
        # -----------------------------------------------------
        #
        # Test pour sur un fichier de l'application
        #
        # -----------------------------------------------------
        istanbul cover -x *.spec.js node_modules/mocha/bin/_mocha --report lcovonly -- -R spec $1
    fi
fi

# -----------------------------------------------------
#
# si rien n'est defini on lance
# les tests angularjs
# et les tests nodejs
#
# -----------------------------------------------------
if [ -z "$1" ]; then
    gulp bower
    istanbul cover -x *.spec.js node_modules/mocha/bin/_mocha --report lcovonly -- -R spec ./spec/src/server/**/*
    karma start karma.conf.js --single-run
fi

rm -f ./project_model_spec
exit 0
