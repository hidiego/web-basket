FROM node:12.13.0 as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm install @angular/cli@8.3.17
RUN ./node_modules/.bin/ng build --prod --output-path ./dist/out

FROM nginx:1.15
COPY --from=builder /app/dist/out/ /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
