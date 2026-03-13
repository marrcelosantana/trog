import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  const showLeft = currentPage > 3;
  const showRight = currentPage < totalPages - 2;
  if (showLeft) {
    pages.push(1, "ellipsis");
  }
  const start = showLeft ? Math.max(2, currentPage - 1) : 1;
  const end = showRight
    ? Math.min(totalPages - 1, currentPage + 1)
    : totalPages;
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (showRight) {
    pages.push("ellipsis", totalPages);
  }
  return pages;
}

interface CardTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CardTablePagination: React.FC<CardTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPageNumbers(currentPage, totalPages);

  const handleClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination className="mt-4 w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={
              currentPage <= 1 ? undefined : handleClick(currentPage - 1)
            }
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            text="Anterior"
          />
        </PaginationItem>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={handleClick(page)}
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={
              currentPage >= totalPages
                ? undefined
                : handleClick(currentPage + 1)
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            text="Próximo"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CardTablePagination;
