#!/usr/bin/env python3
"""
Hypermedia pagination for the Popular_Baby_Names dataset.

This module provides:
- `index_range(page, page_size)`: helper to compute slice boundaries.
- `Server`: a simple CSV-backed server exposing:
    * `dataset()`: cached access to rows (header removed),
    * `get_page(page, page_size)`: page of rows,
    * `get_hyper(page, page_size)`: hypermedia-style pagination payload.

All indexes are computed for 1-based pages and converted to 0-based
slices ([start, end) with end exclusive) to work directly with Python
list slicing.
"""

import csv
import math
from typing import Tuple, List


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Compute 0-based [start, end) slice indexes for a given 1-based page.

    Args:
        page (int): 1-based page number. Must be >= 1.
        page_size (int): number of items per page. Must be >= 1.

    Returns:
        Tuple[int, int]: (start, end) indexes usable directly for slicing,
        where `start` is inclusive and `end` is exclusive.

    Example:
        >>> index_range(1, 10)
        (0, 10)
        >>> index_range(3, 5)
        (10, 15)
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    """
    CSV-backed server offering simple pagination over a baby names dataset.

    Attributes:
        DATA_FILE (str): relative path to the CSV file expected to be present
            in the current working directory when executed by the checker.
    """

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """
        Initialize the server with a lazy, cached dataset container.

        The CSV is only read once; subsequent calls reuse the cached list.
        """
        self.__dataset: List[List[str]] | None = None

    def dataset(self) -> List[List[str]]:
        """
        Load and cache the CSV data, stripping the header row.

        Returns:
            List[List[str]]: list of rows, each row being a list of strings.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE, encoding="utf-8", newline="") as f:
                reader = csv.reader(f)
                rows = [row for row in reader]
            self.__dataset = rows[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List[str]]:
        """
        Return the data rows for a specific page.

        Args:
            page (int): 1-based page number. Must be >= 1.
            page_size (int): number of items per page. Must be >= 1.

        Raises:
            AssertionError: if `page` or `page_size` are not positive integers.

        Returns:
            List[List[str]]: rows contained in the requested page. If the
            computed slice is out of range, returns an empty list.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        data = self.dataset()
        start, end = index_range(page, page_size)
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Return a hypermedia pagination description for the requested page.

        The payload includes the current page, page size (actual length of
        the returned `data`), neighboring page pointers, and the total number
        of pages computed with a ceiling division.

        Args:
            page (int): 1-based page number. Must be >= 1.
            page_size (int): number of items per page. Must be >= 1.

        Raises:
            AssertionError: if `page` or `page_size` are not positive integers.

        Returns:
            dict: {
                "page_size": int,       # length of `data` actually returned
                "page": int,            # current page number
                "data": List[List[str]],# rows for this page
                "next_page": Optional[int],
                "prev_page": Optional[int],
                "total_pages": int
            }
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        page_data = self.get_page(page, page_size)
        total_items = len(self.dataset())

        total_pages = math.ceil(total_items / page_size)

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": len(page_data),
            "page": page,
            "data": page_data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }
