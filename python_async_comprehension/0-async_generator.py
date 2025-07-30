#!/usr/bin/env python3
import asyncio
import random


async def async_generator():
    """Generate 10 random floats between 0 and 10 for 1 second"""
    for i in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
