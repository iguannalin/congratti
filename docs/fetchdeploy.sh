if [ $# -eq 0 ]; then
    echo "No branch name provided as argument"
else
    echo 'Getting '$1' ready ;)'
    rm -rf docs/$1/
    git fetch origin $1
    git checkout $1 -- docs/$1/
    git st
    git add docs/$1/
    git cm 'Auto-generating '$1
    echo $1' finished building. Ready to push!'
fi
