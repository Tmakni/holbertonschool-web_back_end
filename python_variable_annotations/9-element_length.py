#!/usr/bin/env python3
"""
Commentaire
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    com
    """
    return [(i, len(i)) for i in lst]
