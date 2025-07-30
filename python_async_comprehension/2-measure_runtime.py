#!/usr/bin/env python3
"""Module to measure total execution time of async_comprehension"""

import asyncio
import time
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Coroutine that measures the runtime of four async_comprehension

    Each async_comprehension takes approximately 10 seconds to run because
    for each of the 10 values from async_generator.

    Since all 4 calls are awaited in parallel using asyncio.gather
    be slightly more than 10 seconds (not 40), due to concurrency.
    """
    start_time = time.perf_counter()

    await asyncio.gather(
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
        async_comprehension()
    )

    end_time = time.perf_counter()
    return end_time - start_time
