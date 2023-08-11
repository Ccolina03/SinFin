# extend prexisting images (will have two stages)
FROM node:alpine as development

# Creating working directory
WORKDIR /usr/src/app 

# Copying package.json and pnpm to working directory. Allows to employ commands in working directory
COPY package.json ./  
COPY pnpm-lock.yaml ./  

# install globally pnpm
RUN npm install -g pnpm

# install all dependencies from pnpm 
RUN pnpm install

# Copy the whole app into the root of Docker container
COPY . .

# this executes the nest build command found in scripts on package.json
RUN pnpm run build




#Stage 2 of DockerFile: Production
FROM node:alpine as production 

#ARG specifies this is a variable we can override at build time, meanwhile default value is production
ARG NODE_ENV=production

#Expose this as an actual environment variable. So if NODE_ENV is production, run as in a production env. to get runtime optimizations
ENV NODE_ENV=${NODE_ENV}

#create new Working directory
WORKDIR /usr/src/app 

#copy again the packages to the directory
COPY package.json ./
COPY pnpm-lock.yaml ./ 

#install dependencies of pnpm 
RUN npm install -g pnpm 

#Run with prod flag which prevents devDependencies to be installed so only dependencies from package.json will be installed. 
# Gonna make production image lighter
RUN pnpm install --prod

# want to copy dist folder from development to production dist

COPY --from=development /usr/src/app/dist ./dist

# execute running container, copied app to dist from development without devDependencies in our dist production folder
#Look for the main file in reservation 

CMD ["node", "dist/apps/reservations/main"]


#How to initialize from ubuntuwsl: Alternatively, you can also launch Ubuntu using PowerShell:

#Press the Windows key + X on your keyboard to open the Win+X menu.
#Choose "Windows PowerShell (Admin)" from the menu. This will open an elevated PowerShell window.
#In the elevated PowerShell window, type wsl and press Enter. This will start Ubuntu on WSL2.
# After this made Docker-compose file with reservations and mongo as the two initial services to start on. 