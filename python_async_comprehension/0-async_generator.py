#!/usr/bin/env python3
"""Module containing async_generator coroutine."""
import asyncio
import random


async def async_generator():
    """
    Coroutine that asynchronously yields 10 random floats.

    Each number is generated between 0 and 10.
    It waits for 1 second between each yield to simulate
    """
    for i in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
