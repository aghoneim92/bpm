node lib/bump-version $1
git checkout -b bump-version
git add --all
git commit -m $1
git tag -a $1 -m $1 --force
git push --force
git push --tags --force
