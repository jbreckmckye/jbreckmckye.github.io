#!/bin/bash

git clone https://github.com/jbreckmckye/hexo-theme-octo.git

ls

cp -r hexo-theme-octo/layout ./themes/octo/
cp -r hexo-theme-octo/source ./themes/octo/
cp ./_config.theme.yml ./themes/octo/config.yml

cd ./themes/octo && ls
