import React from 'react'
import ReactDOM from 'react-dom'
import AuthorItem from './AuthorItem'
function RankingList({authors}) {
    return (
        <div className="col-span-4 hidden  lg:flex flex-col items-start justify-start gap-4 min-h-80">
            <h3 className="text-xl text-blue-700">CÁC TÁC GIẢ HÀNG ĐẦU</h3>
            <div className="w-full min-h-30">
                {
                    authors.map(author => <AuthorItem authorData = {{...author}} /> )
                }
            </div>
        </div>
    )
}
export default RankingList