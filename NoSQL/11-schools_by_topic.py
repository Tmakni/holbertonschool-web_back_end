#!/usr/bin/env python3
"""
Return all schools that have a given topic
"""


def schools_by_topic(mongo_collection, topic):
    """
    Return all schools that have a given topic
    """
    return list(mongo_collection.find({"topics": topic}))
