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
    console.log(page);

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
              ? "w-20 py-2 bg-blue-500 text-white font-semibold rounded-lg"
              : "w-20 py-2 bg-gray-500 rounded-lg"
          }
        >
          {page}
        </button>
      ));
    } else {
      const renderDots = (key: string) => (
        <button key={key} className="w-20 py-2 bg-gray-400 rounded-lg" disabled>
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
                  ? "w-20 py-2 bg-blue-500 text-white font-semibold rounded-lg"
                  : "w-20 py-2 bg-gray-500 rounded-lg"
              }
            >
              {page}
            </button>
          )),
          renderDots("dotsEnd"),
          <button
            key="lastPage"
            onClick={() => handleClick(totalPages)}
            className="w-20 py-2 bg-gray-500 rounded-lg"
          >
            {totalPages}
          </button>,
        ];
      } else if (currentPage >= totalPages - (maxVisiblePages - 2)) {
        return [
          <button
            key="firstPage"
            onClick={() => handleClick(1)}
            className="w-20 py-2 bg-gray-500 rounded-lg"
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
                  ? "w-20 py-2 bg-blue-500 text-white font-semibold rounded-lg"
                  : "w-20 py-2 bg-gray-500 rounded-lg"
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
            className="w-20 py-2 bg-gray-500 rounded-lg"
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
                  ? "w-20 py-2 bg-blue-500 text-white font-semibold rounded-lg"
                  : "w-20 py-2 bg-gray-500 rounded-lg"
              }
            >
              {page}
            </button>
          )),
          renderDots("dotsEnd"),
          <button
            key="lastPage"
            onClick={() => handleClick(totalPages)}
            className="w-20 py-2 bg-gray-500 rounded-lg"
          >
            {totalPages}
          </button>,
        ];
      }
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center gap-[5px]">
      {renderPages()}
    </div>
  );
}

export default Pagination;
