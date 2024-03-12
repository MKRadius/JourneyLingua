# Stage 1: Build frontend
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend . 
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend . 

# Stage 3: Final image
FROM node:20-alpine
WORKDIR /app
COPY --from=frontend /app/frontend ./frontend
COPY --from=backend /app/backend ./backend
COPY .gitignore ./
COPY Jenkinsfile ./
COPY start-script-unix.sh ./
COPY start-script-windows.bat ./
EXPOSE 5173 3000

# Dynamically generate .env file
ARG DATABASE_URL
ARG PORT
ARG JWTSECRET
RUN echo "DATABASE_URL=$DATABASE_URL" >> ./backend/.env && \
    echo "PORT=$PORT" >> ./backend/.env && \
    echo "JWTSECRET=$JWTSECRET" >> ./backend/.env

CMD ["npm", "run", "dev"]