FROM node:22

# Set working directory in the container
WORKDIR /code

# Install pnpm
RUN npm install -g pnpm

# Copy package files 
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Bundle
COPY . .

EXPOSE 8000

CMD [ "pnpm", "run", "dev" ]
