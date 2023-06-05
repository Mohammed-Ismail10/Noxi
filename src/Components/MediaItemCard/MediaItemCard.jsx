import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItemCard({ item }) {
  return (
    <>
      <div className="col-md-2 col-6">
        <Link className='text-decoration-none text-white' to={`/itemdetails/${item.media_type}/${item.id}`}>
          <div className='position-relative my-3'>
            {item.poster_path ? <img src={`https://image.tmdb.org/t/p/w500` + item.poster_path} className='w-100' alt={item.title} loading='lazy' /> : <img src={`https://image.tmdb.org/t/p/w500` + item.profile_path} className='w-100' alt={item.title} loading='lazy' />}
            <h3 className='h5'>{item.title}{item.name}</h3>
            {item.vote_average ? <div className='bg-info position-absolute top-0 end-0 p-1'>
              {item.vote_average.toFixed(1)}
            </div> : null}
          </div>
        </Link>
      </div>
    </>
  )
}
