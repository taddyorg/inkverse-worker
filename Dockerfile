FROM node:20.17

RUN mkdir app

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install apt-utils -y
RUN apt-get install apt-transport-https ca-certificates -y 
RUN apt-get install -y postgresql-client

# Install yarn from the local .tgz
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Install root node_modules using Yarn
ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock
RUN cd /tmp && $HOME/.yarn/bin/yarn install

# Install scripts node_modules using Yarn
ADD scripts/package.json /tmp-scripts/package.json
ADD scripts/yarn.lock /tmp-scripts/yarn.lock
RUN cd /tmp-scripts && $HOME/.yarn/bin/yarn install

# Install shared node_modules using Yarn
ADD shared/package.json /tmp-shared/package.json
ADD shared/yarn.lock /tmp-shared/yarn.lock
RUN cd /tmp-shared && $HOME/.yarn/bin/yarn install

COPY . /app
WORKDIR /app

RUN cp -a /tmp/node_modules /app/node_modules
RUN cp -a /tmp-scripts/node_modules /app/scripts/node_modules
RUN cp -a /tmp-shared/node_modules /app/shared/node_modules

ENV NODE_ENV=production

CMD [ "npm", "run", "receive-messages"]