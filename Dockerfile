FROM node:16
COPY . .
RUN npm install
RUN npm ci
EXPOSE 8080
CMD ["npm", "start"]
