rm -rf docs/filmotography/
git fetch origin picblog
git checkout picblog -- docs/filmotography/
git st
git add docs/filmotography/
git cm "New auto-build of picblog, ready to deploy"
echo 'Ready to push!'
