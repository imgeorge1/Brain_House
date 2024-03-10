import { PaginationTypes } from "../../types/Types";

function Pagination({
  totalTickets,
  ticketsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationTypes) {
  let pages: number[] = [];
  const maxVisiblePages = 10;

  for (let i = 1; i <= Math.ceil(totalTickets / ticketsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderPages = () => {
    const totalPages = Math.ceil(totalTickets / ticketsPerPage);

    if (totalPages <= maxVisiblePages) {
      return pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          className={
            page === currentPage
              ? "btn btn-primary w-20"
              : "btn btn-secondary w-20"
          }
        >
          {page}
        </button>
      ));
    } else {
      const renderDots = (key: string) => (
        <button key={key} className="btn btn-secondary w-20" disabled>
          ...
        </button>
      );

      if (currentPage <= maxVisiblePages - 2) {
        return [
          pages.slice(0, maxVisiblePages - 1).map((page, index) => (
            <button
              key={index}
              onClick={() => handleClick(page)}
              className={
                page === currentPage
                  ? "btn btn-primary w-20"
                  : "btn btn-secondary w-20"
              }
            >
              {page}
            </button>
          )),
          renderDots("dotsEnd"),
          <button
            key="lastPage"
            onClick={() => handleClick(totalPages)}
            className="btn btn-secondary w-20"
          >
            {totalPages}
          </button>,
        ];
      } else if (currentPage >= totalPages - (maxVisiblePages - 2)) {
        return [
          <button
            key="firstPage"
            onClick={() => handleClick(1)}
            className="btn btn-secondary w-20"
          >
            1
          </button>,
          renderDots("dotsStart"),
          pages.slice(-maxVisiblePages + 1).map((page, index) => (
            <button
              key={index}
              onClick={() => handleClick(page)}
              className={
                page === currentPage
                  ? "btn btn-primary w-20"
                  : "btn btn-secondary w-20"
              }
            >
              {page}
            </button>
          )),
        ];
      } else {
        const startPage = currentPage - Math.floor((maxVisiblePages - 4) / 2);
        const endPage = currentPage + Math.ceil((maxVisiblePages - 4) / 2);

        return [
          <button
            key="firstPage"
            onClick={() => handleClick(1)}
            className="btn btn-secondary w-20"
          >
            1
          </button>,
          renderDots("dotsStart"),
          pages.slice(startPage - 1, endPage).map((page, index) => (
            <button
              key={index}
              onClick={() => handleClick(page)}
              className={
                page === currentPage
                  ? "btn btn-primary w-20"
                  : "btn btn-secondary w-20"
              }
            >
              {page}
            </button>
          )),
          renderDots("dotsEnd"),
          <button
            key="lastPage"
            onClick={() => handleClick(totalPages)}
            className="btn btn-secondary w-20"
          >
            {totalPages}
          </button>,
        ];
      }
    }
  };

  return (
    <div className="container flex flex-wrap md:flex-nowrap justify-center gap-[5px]">
      {renderPages()}
    </div>
  );
}

export default Pagination;
