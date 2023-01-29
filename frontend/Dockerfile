FROM node:18.13.0 as build-stage
WORKDIR /var/jenkins_home/workspace/S08P12E107/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/S08P12E107/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/S08P12E107/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/letsencrypt/live/i8e107.p.ssafy.io/fullchain.pem /etc/letsencrypt/live/i8e107.p.ssafy.io/fullchain.pem
COPY /etc/letsencrypt/live/i8e107.p.ssafy.io/privkey.pem /etc/letsencrypt/live/i8e107.p.ssafy.io/privkey.pem
#EXPOSE 80
EXPOSE 80 443
CMD ["nginx", "-g","daemon off;"]