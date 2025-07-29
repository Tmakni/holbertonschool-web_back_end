#!/usr/bin/env python3
import random
import asyncio
"""
commentaire
"""


async def wait_random(max_delay: int = 10) -> float:
    """
    commentaire
    """
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
