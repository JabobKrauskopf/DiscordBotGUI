from setuptools import find_packages, setup

setuptools_kwargs = {
    "install_requires": [
        "aiohttp==3.7.4",
        "async-timeout==3.0.1",
        "asyncio==3.4.3",
        "attrs==20.2.0",
        "cffi==1.14.3",
        "chardet==3.0.4",
        "click==7.1.2",
        "discord==1.0.1",
        "discord.py==1.5.0",
        "flake8==3.8.4",
        "Flask==1.1.2",
        "Flask-Cors==3.0.9",
        "idna==2.10",
        "importlib-metadata==2.0.0",
        "itsdangerous==1.1.0",
        "Jinja2==2.11.3",
        "MarkupSafe==1.1.1",
        "mccabe==0.6.1",
        "multidict==4.7.6",
        "nest-asyncio==1.4.1",
        "psycopg2==2.8.6",
        "pycodestyle==2.6.0",
        "pycparser==2.20",
        "pyflakes==2.2.0",
        "PyNaCl==1.4.0",
        "python-dotenv==0.14.0",
        "six==1.15.0",
        "typing-extensions==3.7.4.3",
        "Werkzeug==1.0.1",
        "yarl==1.5.1",
        "zipp==3.3.1",
    ]
}

# Start the setup
setup(
    name="bot_lib",
    version="0.1",
    packages=find_packages(exclude=["tests"]),
    **setuptools_kwargs,
)
