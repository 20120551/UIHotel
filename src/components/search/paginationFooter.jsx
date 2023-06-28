
export function PaginationFooter({ length, take, handlePagination, page }) {
    return (Array.apply(null, { length: parseInt(Math.round(length / take)) })
        .map((_, index) => {
            return (<a
                key={index}
                className={index + 1 === page ? "page_active" : ""}
                onClick={(e) => {
                    handlePagination(e, { page: index + 1 })
                }}>{index + 1}</a>)
        }))
}