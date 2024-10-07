# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your backend API will run on
EXPOSE 5000

# Command to run your backend
CMD ["npm", "start", "npm run start:dev"]
