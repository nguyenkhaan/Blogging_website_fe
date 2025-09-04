import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import FilterBar from './FilterBar'

export default function SearchBoard() {

    return (
        <div className='flex flex-col w-full py-10 items-center'>
            <FilterBar></FilterBar>
            
        </div>
    )
}