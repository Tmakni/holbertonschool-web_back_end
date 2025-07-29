#!/usr/bin/env python3
"""Module that defines task_wait_random to return"""

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Return an asyncio.Task for wait_random with

    Args:
        max_delay (int): The maximum delay in seconds to

    Returns:
        asyncio.Task: The asyncio Task object that
    """
    return asyncio.create_task(wait_random(max_delay))
