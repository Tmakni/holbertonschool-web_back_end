#!/usr/bin/env python3
import time
import asyncio
"""Module containing wait_random, an async coroutine that ret"""


wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Waits asynchronously for a random delay and returns it.

    Args:
        max_delay (int): The maximum delay in seconds. Defaults to 10.

    Returns:
        float: The random delay actually waited.
    """
    start = time.time()
    asyncio.run(wait_n(n, max_delay))
    end = time.time()
    total_time = end - start
    return total_time / n
