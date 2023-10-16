#Node runtime
FROM node:20

#Set the working directory
WORKDIR /prepit-frontend/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source into the container
COPY . .

# Build the React application
RUN npm run build

EXPOSE 3000