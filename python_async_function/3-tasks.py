#!/usr/bin/env python3
import asyncio
"""Module containing wait_random, an async coroutine that ret"""


wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Waits asynchronously for a random delay and returns it.

    Args:
        max_delay (int): The maximum delay in seconds. Defaults to 10.

    Returns:
        float: The random delay actually waited.
    """
    return asyncio.create_task(wait_random(max_delay))
