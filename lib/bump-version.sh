#!/usr/bin/env sh
git branch -D bump-version
git checkout -b bump-version
node lib/bump-version $1
git add --all
git commit -m $1
git tag -a $1 -m $1 --force
git push --force
git push --tags --force
