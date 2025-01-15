FROM node:22.13.0-bookworm-slim

# Following https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker

# install dependencies

RUN apt-get update && apt-get install -y --no-install-recommends \
    automake \
    autotools-dev \
    build-essential \
    ca-certificates \
    dumb-init \
    libleptonica-dev \
    libtool \
    wget \
    zlib1g-dev

WORKDIR /opt
RUN wget https://github.com/agl/jbig2enc/archive/refs/tags/0.30.tar.gz
RUN tar xzf 0.30.tar.gz

WORKDIR /opt/jbig2enc-0.30
RUN ./autogen.sh && ./configure && make && make install

RUN apt-get install -y --no-install-recommends \
    ocrmypdf \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY --chown=node:node . .

VOLUME [ "/usr/src/app" ]

EXPOSE 8080

USER node
CMD ["dumb-init", "node", "index.js" ]
