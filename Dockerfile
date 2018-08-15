FROM nginx:1.14

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /eos-tracker
