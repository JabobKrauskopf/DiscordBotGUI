python3 -m virtualenv .venv
source .venv/bin/activate
pip install -r src/requirements.txt
cd src/
pip install -e .
