#!/bin/bash
docker run --volumes-from=bbali-api_app_1 -w=/usr/src -it --rm node:10 /bin/bash
