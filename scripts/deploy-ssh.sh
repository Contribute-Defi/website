# this simple script expects the USER has access to the HOST's HOST_PATH via key

HOST=185.28.100.144
USER=jirka
HOST_PATH=/var/www/contribute/

scp -r dist/* $USER@$HOST:$HOST_PATH
