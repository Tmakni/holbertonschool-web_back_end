#!/usr/bin/env python3
"""
new doc
"""

from typing import Any


def insert_school(mongo_collection, **kwargs):
    """
    new doc
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
