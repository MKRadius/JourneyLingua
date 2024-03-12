#!/bin/bash

# Change directory to the frontend directory
cd /frontend

# Run npm run dev in the frontend directory
npm run dev &

# Change directory to the backend directory
cd /backend

# Run npm run dev in the backend directory
npm run dev &
