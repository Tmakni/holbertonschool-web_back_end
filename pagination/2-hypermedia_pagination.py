#!/usr/bin/env python3

"""
fonction index range
"""

import csv
import math
from pathlib import Path
from typing import Tuple, List


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    fonction index range
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """
        fonction
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        fonction dataset
        """
        if self.__dataset is None:
            csv_path = Path(__file__).with_name(self.DATA_FILE)
            with csv_path.open(encoding="utf-8", newline="") as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return rows for the given page (1-indexed) and page_size.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        data = self.dataset()
        start, end = index_range(page, page_size)
        return data[start:end]

    def get_hyper (self, page: int = 1, page_size: int = 10) -> dict:
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        data = self.dataset()
        start, end = index_range(page, page_size)
        total = len(self.dataset())
        total_pages = math.ceil(total / page_size) if page_size else 0
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None
        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }
