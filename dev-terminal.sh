#!/bin/bash
docker run -v $(pwd):/usr/src -w="/usr/src" -it --rm node:10 /bin/bash
