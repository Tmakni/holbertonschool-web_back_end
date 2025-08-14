#!/usr/bin/env python3
"""
list all
"""


def list_all(mongo_collection):
    """
    list all
    """
    if mongo_collection is None:
        return []
    return list(mongo_collection.find())
