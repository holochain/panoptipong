if [ -z $1 ]
then
  echo "starting"
  fswatch -r0 -e ".*" -i ".*/src/.*\.js" dna \
  | xargs -0n 1 -I {} $0 {}

else
  echo $1
  DIR=`echo $1 | sed -e "s/\(.*\)\/src\/\(.*\)$/\1/"`
  SRCDIR=`echo $1 | sed -e "s/\(.*\/src\)\/\(.*\)$/\1/"`
  DIRNAME=`echo $DIR | grep -o "\/[^/]*$"`
  OUTFILE="$DIR$DIRNAME.js"
  echo "babel -o $OUTFILE $DIR"
  babel -o $OUTFILE $SRCDIR
fi
