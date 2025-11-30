#!/usr/bin/env bash

export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch --force --env-filter '
WRONG_EMAIL="autobella@example.com"
NEW_NAME="Moniem Ghazal"  
NEW_EMAIL="moniemghazal@gmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]; then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]; then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' --tag-name-filter cat -- --all
