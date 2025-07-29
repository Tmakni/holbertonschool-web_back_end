#!/usr/bin/env python3
"""
commentaire
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    commentaire
    """
    def multiplier_function(x: float) -> float:
        """
        commentaire
        """
        return x * multiplier
    return multiplier_function
