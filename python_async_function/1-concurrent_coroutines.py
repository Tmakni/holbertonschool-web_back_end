#!/usr/bin/env python3
"""Module defining wait_n, which runs wait_random concurrently"""


import asyncio
from typing import List


wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Run wait_random n times concurrently and return the list

    Args:
        n (int): Number of times to spawn wait_random.
        max_delay (int): Maximum delay passed to each wait_random.

    Returns:
        List[float]: List of delays, sorted in order of completion.
    """
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]
    delays = []

    for task in asyncio.as_completed(tasks):
        delays.append(await task)

    return delays
