#!/usr/bin/env python3
"""
Change topics
"""
from typing import List


def update_topics(mongo_collection, name: str, topics: List[str]) -> None:
    """
    Change topics
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
