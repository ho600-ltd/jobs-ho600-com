#!/bin/bash

WORKSPACE=$1
BUILD_URL=$2
BUILD_NUMBER=$3
MERCURIAL_REVISION=${4:0:4}
BUILD_TIME=`date +%Y-%m-%dT%H:%M:%S%z`

cat << EOF > $WORKSPACE/jobs-ho600-com/__version__.json
{
    "BUILD_URL": "`echo ${BUILD_URL} | sed 's/https\?:\/\/[^\/]\+\//http:\/\/build.dev.null\//'`",
    "BUILD_NUMBER": "${BUILD_NUMBER}",
    "VERSION": "${MERCURIAL_REVISION}",
    "BUILD_TIME": "${BUILD_TIME}"
}
EOF

sed "s/\${BUILD_NUMBER}/${BUILD_NUMBER}/g" $WORKSPACE/jobs-ho600-com/index.html > $WORKSPACE/jobs-ho600-com/_index.html
sed "s/\${MERCURIAL_REVISION}/${MERCURIAL_REVISION}/g" $WORKSPACE/jobs-ho600-com/_index.html > $WORKSPACE/jobs-ho600-com/__index.html
sed "s/\${BUILD_TIME}/${BUILD_TIME}/g" $WORKSPACE/jobs-ho600-com/__index.html > $WORKSPACE/jobs-ho600-com/___index.html
mv $WORKSPACE/jobs-ho600-com/___index.html $WORKSPACE/jobs-ho600-com/index.html
rm -rf $WORKSPACE/jobs-ho600-com/*_index.html
aws --profile s3-jobs-ho600-com-full-access s3 sync $WORKSPACE/jobs-ho600-com s3://jobs.ho600.com