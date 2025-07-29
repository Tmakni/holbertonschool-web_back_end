#!/usr/bin/env python3
"""Module containing wait_random, an async coroutine that ret"""


import random
import asyncio


async def wait_random(max_delay: int = 10) -> float:
    """Waits asynchronously for a random delay and returns it.

    Args:
        max_delay (int): The maximum delay in seconds. Defaults to 10.

    Returns:
        float: The random delay actually waited.
    """
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
