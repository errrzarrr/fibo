# WARNING: For production purposes
FROM node:alpine as frontEndBuilder
WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./ 
RUN npm install
COPY . .
RUN npm run build

# 2nd stage
# move frontend static content from previous stage
# to where nginx serves it from (/usr/share/nginx/html)
# nginx gets started automatically by container
FROM nginx
# EXPOSE is a 'sugestion', communication between devs
# As for AWS EB, it undestands it must map it outwards
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontEndBuilder /app/build /usr/share/nginx/html