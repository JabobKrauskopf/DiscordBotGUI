from dotenv import load_dotenv
from threading import Thread
import nest_asyncio
import psycopg2
import asyncio
import discord
import os

nest_asyncio.apply()

load_dotenv()

connection = psycopg2.connect(
    user=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=os.getenv("POSTGRES_PORT"),
    database=os.getenv("POSTGRES_DATABASE"),
)

client = discord.Client()
cursor = connection.cursor()

cursor.execute("SELECT token FROM app_public.bot WHERE id=1;")
record = cursor.fetchone()

botLoop = None


class Threader(Thread):
    def __init__(self, token):
        global botLoop
        Thread.__init__(self)
        try:
            self.loop = asyncio.get_event_loop()
        except RuntimeError:
            self.loop = asyncio.new_event_loop()
        botLoop = self.loop
        self.start()
        self.token = token

    async def starter(self):
        self.discord_client = client
        await self.discord_client.start(self.token)

    def run(self):
        self.name = "Discord.py"

        self.loop.create_task(self.starter())
        self.loop.run_forever()


@client.event
async def on_ready():
    print(f"{client.user.name} has connected to Discord!")
    await client.change_presence(activity=discord.Game(name="Visit localhost:3000"))


@client.event
async def on_message(message):
    if message.content.lower() == "mach mal":
        channel = message.channel
        await channel.send('Test!')


def get_bot_status():
    return client.user


def get_all_channels():
    channels = client.get_all_channels()
    return channels


def rename(name):
    loop = botLoop
    loop.run_until_complete(client.user.edit(username=name))
