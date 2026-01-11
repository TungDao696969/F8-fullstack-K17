export default function Pagination({ currentPage, totalPage, onPageChange }) {
  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            fontWeight: page === currentPage ? "bold" : "normal",
          }}
          className={`
            px-3 py-1 border rounded cursor-pointer
            ${
              page === currentPage
                ? "bg-blue-600 text-white font-bold"
                : "bg-white hover:bg-gray-400"
            }
          `}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
