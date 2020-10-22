python3 -m virtualenv .venv
source .venv/bin/activate
# LDFLAGS for MacOS
env LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib"
pip install -r src/requirements.txt
cd src/
pip install -e .
