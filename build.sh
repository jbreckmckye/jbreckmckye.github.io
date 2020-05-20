#!/bin/bash

mkdir themes
git clone https://github.com/jbreckmckye/hexo-theme-octo.git themes/octo
cp _config.theme.yml ./themes/octo/config.yml
hexo generate

echo "INSIDE OCTO:"
cd ./themes/octo && ls
echo "-----"
