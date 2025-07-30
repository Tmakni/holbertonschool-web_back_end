#!/usr/bin/env python3
"""Module to collect data from async_generator using async"""

from typing import List
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Coroutine that collects 10 values from async_generator.

    Uses an async list comprehension to retrieve and return
    all 10 floating-point numbers produced by async_generator.
    """
    return [i async for i in async_generator()]
