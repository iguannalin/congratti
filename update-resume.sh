if [ -z "$1" ] && [ -z "$2" ]; then
  echo "🌺 git commit message missing!"
else
  git st
  git pull --rebase
  cp resume/*.pdf public/
  git add -A
  git cm "$1"
  git push
fi