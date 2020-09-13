FROM nginx:1.18-alpine

ARG service 
ARG environment 

# Set working directory
WORKDIR /usr/app


RUN apk update && \
    apk add --no-cache git \
                       python3 \
                       curl \
                       autoconf \
                       automake \
                       build-base \
                       zlib \
                       zlib-dev \
                       jpeg-dev \
                       libpng-dev \
                       nasm \
                       libtool \
                       yarn --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community" \
                       nodejs --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community" \
                       tzdata


# COPY  ./ /usr/app

COPY ${service} ./${service}

COPY react-components ./react-components

COPY lerna.json package.json ./


RUN pip3 install git+https://github.com/Supervisor/supervisor && \
    yarn install && \
    yarn transpile && \
    yarn cache clean && \
    yarn workspace @digivfe/${service} build:${environment}

COPY _build/Supervisord/${service}.conf ./supervisor.conf
RUN sed -i "s#{{ENVIRONMENT}}#${environment}#g" ./supervisor.conf

RUN mkdir -p /var/log/supervisor

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY _build/default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80

# Launch NGINX
ENTRYPOINT  [ "supervisord", "-c", "supervisor.conf" ]
