FROM  ghcr.io/static-web-server/static-web-server:2

ARG BUILD_DATE
ARG SEMVER2

LABEL org.opencontainers.image.authors="Closure OSS Contributors" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.version="${SEMVER2}"

ENV SERVER_ROOT=/public

WORKDIR /public
COPY --exclude=appsettings.json /dist/admin/browser .
ENTRYPOINT ["/static-web-server"]

EXPOSE 8081/tcp
