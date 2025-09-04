import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import SearchResultsItem from "./SearchResultsItem";

function SearchResult({ data }) 
{
    const {searchInput , dataShow = [] } = data  
    const totalPage = Math.ceil(dataShow.length / 20) 
    const [page , setPage] = useState(0)
    const handlePageClick = ({selected}) => {
        setPage(selected)
    } 
    
    return (
        <>
            <span className="mt-3 mb-3 block w-full text-right italic text-sm text-gray-600">{`${(dataShow)? dataShow.length : 0} kết quả phù hợp với ${searchInput}`}</span>
            <div className='px-6 lg:px-0 flex-1 w-full min-h-80 gap-4 flex flex-col items-start justify-start divide-y divide-gray-300 pr-6"'>
                {dataShow.slice(page * 20 , page * 20 + 20).map((data) => {
                    return <SearchResultsItem blogData={data} />;
                })}
            </div>
            <div className="w-full col-span-16 flex justify-center items-center my-6">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    pageRangeDisplayed={3}   //display bao nheiu trang thi xuat hien dau cham 
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    pageCount={totalPage}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination flex items-center text-blue-600 text-xl justify-center gap-1"
                    previousLinkClassName="2xl:p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition"
                    nextLinkClassName='2xl:p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition'
                    // nextClassName='p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition'
                    activeClassName="rounded font-semibold text-white bg-blue-600"
                    pageLinkClassName="2xl:p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition"
                />
            </div>
        </>
    );
}
export {SearchResult}