from dotenv import load_dotenv
from threading import Thread
import asyncio
import discord
import os

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

client = discord.Client()


class Threader(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.loop = asyncio.get_event_loop()
        self.start()

    async def starter(self):
        self.discord_client = client
        await self.discord_client.start(TOKEN)

    def run(self):
        self.loop.create_task(self.starter())
        self.loop.run_forever()


@client.event
async def on_ready():
    print(f"{client.user} has connected to Discord!")


@client.event
async def on_message_edit(before, after):
    await after.channel.send("I can see that {0}! ".format(after.author.name))


def get_all_channels():
    channels = client.get_all_channels()
    return channels


Threader()
