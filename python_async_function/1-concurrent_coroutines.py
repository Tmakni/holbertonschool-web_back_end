#!/usr/bin/env python3
import asyncio
from typing import List
"""Module containing wait_random, an async coroutine that ret"""


wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Waits asynchronously for a random delay and returns it.

    Args:
        max_delay (int): The maximum delay in seconds. Defaults to 10.

    Returns:
        float: The random delay actually waited.
    """
    delays = []
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]

    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)

    return delays
