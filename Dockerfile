# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of the application code to the working directory
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 8000

# Command to run your application in production mode
CMD ["npm", "run", "start"]
