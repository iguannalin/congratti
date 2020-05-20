rm -rf docs/picblog/
git fetch origin picblog
git checkout picblog -- docs/picblog/build
git st
git add docs/picblog/
git cm "New auto-build of picblog, ready to deploy"
echo 'Ready to push!'
