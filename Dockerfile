FROM node:20
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run","dev"]
# docker build -t careipro.com .
# docker run -p 3000:3000 careipro.com
# docker run -p 3000:3000 -v $(pwd):/app my-node-app