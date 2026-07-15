#!/bin/sh
set -e
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js
exec nginx -g "daemon off;"
