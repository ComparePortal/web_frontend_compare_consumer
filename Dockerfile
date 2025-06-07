FROM node:14.18.0-alpine
WORKDIR /frontend
RUN npm install --global pm2
COPY ./package*.json /frontend
RUN npm install --production
COPY ./ ./
RUN npm run build
EXPOSE 3000
USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]

