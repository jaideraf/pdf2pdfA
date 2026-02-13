# OS - Ubuntu Based
FROM jbarlow83/ocrmypdf:v16.13.0

# set timezone
ENV TZ=America/Sao_Paulo
RUN set -eux; \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# add node user
RUN groupadd --gid 1001 node \
  && useradd --uid 1001 --gid node --shell /bin/bash --create-home node

# setup
RUN apt-get update && apt-get install -y --no-install-recommends \
  dumb-init \
  curl && \
  # node LTS
  curl -sL https://deb.nodesource.com/setup_24.x | bash - && \
  apt-get install -y --no-install-recommends nodejs && \
  # clean
  rm -rf /var/lib/apt/lists/*

# override entrypoint
ENTRYPOINT ["dumb-init", "/usr/bin/env"]

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

VOLUME [ "/usr/src/app" ]

EXPOSE 8080

USER node

CMD ["dumb-init", "node", "bin/www.js" ]
