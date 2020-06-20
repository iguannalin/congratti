if [ $# -eq 0 ]; then
    echo 'No commit msg provided as argument'
else
    npm run build
    git st
    git add ../portfolio
    git add ../dev-portfolio
    git cm '$1'
    echo 'Ready to push! New changes ' $1
fi
