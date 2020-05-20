rm -rf docs/portfolio/
git fetch origin portfolio
git checkout portfolio -- docs/portfolio/build
git st
git add docs/portfolio/
git cm "New auto-build of portfolio, ready to deploy"
echo 'Ready to push!'
