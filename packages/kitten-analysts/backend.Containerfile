FROM docker.io/library/node:22.7.0-bookworm

LABEL "org.opencontainers.image.description"="Kitten Analysts Backend"

WORKDIR /opt
COPY "node_modules" "node_modules"
COPY "packages/kitten-analysts/package.json" "package.json"
COPY "packages/kitten-analysts/output" "output"

CMD [ "/bin/bash", "-c", "node output/entrypoint-backend.js" ]
