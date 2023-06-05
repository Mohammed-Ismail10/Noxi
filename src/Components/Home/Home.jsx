import React, { useEffect } from 'react'
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux'
import { getTrend } from '../../Redux/HomeSlice.js';
import MediaItemCard from '../MediaItemCard/MediaItemCard.jsx';

export default function Home() {
  let { movie, tv, person } = useSelector(({ home }) => home);
  let dispatch = useDispatch();

  async function getTrending(mediaItem) {
    let { payload } = await dispatch(getTrend(mediaItem));
  }

  useEffect(() => {
    getTrending('movie');
    getTrending('tv');
    getTrending('person');
  }, [])


  return (
    <>
      <Helmet>
        <title>Noxi - Home Trening Movies, Tvs and Persons</title>
      </Helmet>
      {movie ? <div className="container my-5 py-5">

        <div className="row py-3">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className='border border-white w-25 mb-3'></div>
              <h2 className='text-capitalize h3'>trending <br />movies <br /> to watch now</h2>
              <p className='text-capitalize text-muted'>most watched movies by week</p>
              <div className='border border-white w-100 mt-3'></div>
            </div>
          </div>
          {movie?.slice(0, 10).map((item) => <MediaItemCard item={item} key={item.id} />)}
        </div>

        <div className="row py-3">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className='border border-white w-25 mb-3'></div>
              <h2 className='text-capitalize h3'>trending <br />tv <br /> to watch now</h2>
              <p className='text-capitalize text-muted'>most watched tv by week</p>
              <div className='border border-white w-100 mt-3'></div>
            </div>
          </div>
          {tv?.slice(0, 10).map((item) => <MediaItemCard item={item} key={item.id} />)}
        </div>

        <div className="row py-3">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className='border border-white w-25 mb-3'></div>
              <h2 className='text-capitalize h3'>trending <br />person <br /> to watch now</h2>
              <p className='text-capitalize text-muted'>most watched person by week</p>
              <div className='border border-white w-100 mt-3'></div>
            </div>
          </div>
          {person?.slice(0, 10).map((item) => <MediaItemCard item={item} key={item.id} />)}
        </div>
      </div> : <div className='container vh-100 d-flex justify-content-center align-items-center'><div class="spinner-border text-primary p-5" role="status"></div></div>}
    </>
  )
}
