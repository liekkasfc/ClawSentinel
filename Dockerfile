FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create reports directory
RUN mkdir -p reports

CMD ["npm", "test"]
