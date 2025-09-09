FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y python3 python3-pip \
 && rm -rf /var/lib/apt/lists/*
RUN rm -f /usr/lib/python*/EXTERNALLY-MANAGED || true
RUN python3 -m pip install --no-cache-dir flask
WORKDIR /app
COPY ./api.py /app/api.py
EXPOSE 5252
CMD ["python3", "/app/api.py"]
