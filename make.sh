#!/bin/bash
clear
echo "Installing npm dependencies."
npm install
clear
echo "installing bower dependencies"
bower install
clear
echo "running grunt tasks"
grunt
