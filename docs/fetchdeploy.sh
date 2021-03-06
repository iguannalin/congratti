if [ $# -eq 0 ]; then
    echo 'No branch name provided as argument'
elif [ $1 == 'bookshelf' ]; then
    echo 'Getting le bookshelf ready'
    cd ../dev-bookshelf
    npm run build
    rm -rf ../docs/bookshelf/*
    cp ./dist/* ../docs/bookshelf/
    git add ../docs/bookshelf/
    rm -rf ./dist
    git add ./
    git cm 'Auto-deploying 'bookshelf
    cd ../
    echo $1' finished building, and moved folders. Check index.html .js file import is correct! Ready to push!'
elif [ $1 == 'congratti' ]; then
    echo 'Getting congratti ready :))'
    cd ../dev-congratti
    npm run build
    rm ../docs/index.html
    rm -rf ../docs/src/*
    mv ./dist/index.html ../docs/
    mv ./dist/* ../docs/src/
    git add ../docs/index.html
    git add ../docs/src
    rm -rf ./dist
    git add ./
    cd ../
    git cm 'Auto-deploying '$1
    echo $1' finished building, and moved folders. Check index.html is correct! Ready to push!'
else
    echo 'Getting '$1' ready ;)'
    rm -rf ./$1/
    git fetch origin $1
    git checkout $1 -- ./$1/
    git st
    git add ./$1/
    git cm 'Auto-generating '$1
    echo $1' finished building. Ready to push!'
fi
