# OS - Ubuntu Based
FROM jbarlow83/ocrmypdf:v16.8.0

# set timezone
ENV TZ=America/Sao_Paulo
RUN set -eux; \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# setup
RUN apt update && apt install -y \
 	# tesseract language packages
	tesseract-ocr-por \
	poppler-utils \
	curl && \
	# clean
	apt clean && \
	apt autoremove -y

# node LTS
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - && \
	apt purge nodejs -y && \
	apt install -y nodejs && \
	echo "Node Version:" && node -v && \
	# clean
	apt clean && \
	apt autoremove -y

# override entrypoint
ENTRYPOINT ["/usr/bin/env"]

ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./

#RUN npm ci --only=production && npm cache clean --force

RUN npm install

# Bundle app source
COPY --chown=node:node . .

VOLUME [ "/usr/src/app" ]

EXPOSE 8080

#USER node
#CMD ["dumb-init", "node", "index.js" ]

CMD ["npm", "run", "dev"]
