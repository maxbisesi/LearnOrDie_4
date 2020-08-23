#!/bin/zsh

browser="chrome"
while getopts "b:fc" opt
do
   case "$opt" in
      b ) browser="$OPTARG" ;;
      f ) browser="firefox" ;;
      c ) browser="chrome" ;;
   esac
done
echo "Run UI tests in: $browser"
# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export TEST_BROWSER="$browser"

npx cucumber-js lib/cucumber/features --require-module @babel/register --require lib/Cucumber/steps --tags @UserAfterLoginSeeProfile
