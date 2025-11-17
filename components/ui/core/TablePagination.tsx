import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../button";

interface TablePaginationProps {
  totalPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const TablePagination = ({
  totalPage = 10,
  currentPage = 1,
  onPageChange,
}: TablePaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7;

    if (totalPage <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPage - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPage - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Left side - Page info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPage}
      </div>

      {/* Center - Pagination controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            text-sm font-medium transition-all
            ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="min-w-[40px] h-10 px-3 flex items-center justify-center text-gray-500"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`
                  min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium
                  transition-all
                  ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-indigo-800 to-pink-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                {String(pageNum).padStart(2, "0")}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPage}
          className={`
            flex items-center gap-2 px-5 py-2 rounded-lg
            text-sm font-medium transition-all
            ${
              currentPage === totalPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-800 to-pink-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all duration-300"
            }
          `}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Right side - Empty for balance */}
      <div className="w-24"></div>
    </div>
  );
};

export default TablePagination;
