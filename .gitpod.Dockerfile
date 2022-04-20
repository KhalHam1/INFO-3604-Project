ui:
    image: cypress/base:latest
    # if targeting a specific node version, use e.g.
    # image: cypress/base:14


RUN npm i -g firebase-tools
RUN npm i -g @angular/cli

RUN npm install cypress --save-dev

#set puppeteer chrome as chrome
#ENV CHROME_BIN=/workspace/starterkit/node_modules/puppeteer/.local-chromium/linux-938248/chrome-linux/chrome
#RUN gp env --export CHROME_BIN=/workspace/starterkit/node_modules/puppeteer/.local-chromium/linux-938248/chrome-linux/chrome
