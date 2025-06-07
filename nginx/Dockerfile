FROM nginx:alpine
# COPY --from=build /frontend/.next /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/*
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
# EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]