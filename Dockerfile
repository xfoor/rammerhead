FROM node:16
COPY . .
RUN npm install
RUN npm run build
RUN npm ci
CMD ["npm", "start"]
