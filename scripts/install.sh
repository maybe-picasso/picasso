#!/bin/bash
echo "install node modules"

echo "install frontend dependencies"
cd frontend
yarn install

echo "install backend dependencies"
cd ../
cd backend
yarn install