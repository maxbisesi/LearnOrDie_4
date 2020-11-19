#!/bin/zsh

browser="chrome"
sleepBeforeQuit="false"
while getopts "b:fcw" opt
do
   case "$opt" in
      b ) browser="$OPTARG" ;;
      f ) browser="firefox" ;;
      c ) browser="chrome" ;;
      w ) sleepBeforeQuit="true" ;;
   esac
done
echo "Run UI tests in: $browser"
# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export TEST_BROWSER="$browser"
export SLEEP_BEFORE_QUIT="$sleepBeforeQuit"

npx cucumber-js lib/cucumber/features --format json:lib/Cucumber/reports/report.json --require-module @babel/register --require lib/Cucumber/steps --tags $1
node lib/Cucumber/reports/index.js
