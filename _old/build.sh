#!/bin/bash

mkdir themes
git clone --single-branch --branch nova https://github.com/jbreckmckye/hexo-theme-octo.git themes/octo
cp _config.theme.yml ./themes/octo/_config.yml

hexo generate
