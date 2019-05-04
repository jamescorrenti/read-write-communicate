FROM python:3.6-alpine

ENV FLASK_APP rwc.py
ENV FLASK_CONFIG production

RUN adduser -D rwc
USER rwc

WORKDIR /home/rwc

COPY requirements requirements
RUN python -m venv venv
RUN venv/bin/pip install -r requirements/docker.txt

COPY app app
COPY migrations migrations
COPY rwc.py config.py boot.sh ./

# run-time configuration
EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
