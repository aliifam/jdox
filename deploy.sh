git add .

msg="update notes `date`"
if [ $# -eq 1 ]
    then msg="$1"
fi

git commit -m "$msg"

git push origin master