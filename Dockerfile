# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM node:12.16.1-slim
MAINTAINER Golfen Guo <zhangmeng>

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server
RUN echo "Hello World DaoCloud!"

WORKDIR /app
COPY . /app

RUN  npm config set registry registry.npm.taobao.org \
     && npm install \
     && npm run build \
     && cp -r dist/* /Users/zhangmeng/all/docker \
     && rm -rf /app

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
EXPOSE 80

# The CMD instruction provides default execution command for an container
# Start Nginx and keep it from running background
#CMD ["nginx", "-g", "daemon off;"]