import React, { useEffect } from 'react'
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetails } from '../../Redux/DetailsSlice.js';

export default function ItemDetails() {
  let { itemDetails } = useSelector(({ details }) => details)
  let { mediaType, id } = useParams();
  let dispatch = useDispatch();

  async function getDetailsF(mediaType, id) {
    let { payload } = await dispatch(getDetails({ mediaType, id }));
    console.log(payload);
  }

  useEffect(() => {
    getDetailsF(mediaType, id);
  }, [])

  return (
    <>
      <Helmet>
        <title>{`Noxi - ${itemDetails?.title || itemDetails?.name}`}</title>
      </Helmet>
      <div className="container my-5 py-5">
        {itemDetails ? <div className="row">
          <div className="col-md-3">
            <div>
              {itemDetails?.poster_path ? <img src={`https://image.tmdb.org/t/p/w500` + itemDetails?.poster_path} className='w-100' alt={itemDetails?.title} loading='lazy' /> : <img src={`https://image.tmdb.org/t/p/w500` + itemDetails?.profile_path} className='w-100' alt={itemDetails?.title} loading='lazy' />}
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2>{itemDetails?.title}{itemDetails?.name}</h2>
              <p className='text-muted'>{itemDetails?.overview}{itemDetails?.biography}</p>
              {itemDetails?.vote_average ? <h4>Vote average: {itemDetails?.vote_average.toFixed(2)}</h4> : null}
              {itemDetails?.vote_count ? <h4>Vote count: {itemDetails?.vote_count}</h4> : null}
              {itemDetails?.homepage ? <Link className='btn btn-primary' target={'_blank'} to={itemDetails?.homepage}>Go to website</Link> : ''}
            </div>
          </div>
        </div> : <div className='container vh-100 d-flex justify-content-center align-items-center'><div class="spinner-border text-primary p-5" role="status"></div></div>}
      </div>
    </>
  )
}
