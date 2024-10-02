git st
git pull --rebase
rm resume/*
cp public/resume/* resume/
git add -A
git cm $1
git push
