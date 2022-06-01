#!/bin/sh
pushd meal-planner-fredericton-ui

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
if [[ "$STAGED_FILES"="" ]]; then
  exit 0
fi

PASS=true

echo "\nValidating Javascript:\n"

## We do not need eslint check this way. It is already added to devDependencies
# Check for eslint
# which eslint &> /dev/null
# if [[ "$?" == 1 ]]; then
#   echo "\t\033[41mPlease install ESlint\033[0m"
#   exit 1
# fi

# echo $(which eslint)
prefix="meal-planner-fredericton-ui/"
for FILE in $STAGED_FILES
do
  checked_file="${FILE#$prefix}"
  #./node_modules/.bin/eslint "$FILE"
  npx eslint $checked_file

  if [[ "$?" == 0 ]]; then
    #echo "\t\033[32mESLint Passed: $FILE\033[0m"
    echo "\t\033[32mESLint Passed: $checked_file\033[0m"
  else
    #echo "\t\033[31mESLint Failed: $FILE\033[0m"
    echo "\t\033[31mESLint Failed: $checked_file\033[0m"
    PASS=false
  fi
done

echo "\nJavascript validation completed!\n"

if ! $PASS; then
  echo "\033[31mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and commit again"
  exit 1
else
  echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi

popd

exit $?
