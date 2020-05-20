#!/bin/bash

git clone https://github.com/jbreckmckye/hexo-theme-octo.git
mkdir themes/octo

echo "Root:"
ls

cp -r hexo-theme-octo ./themes/octo
cp _config.theme.yml ./themes/octo/config.yml

echo "Theme:"
cd ./themes && ls
echo "Octo:"
cd ./octo && ls