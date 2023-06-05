import React, { useEffect } from 'react'
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decPage, getTvs, incPage, storeCurrentPage } from '../../Redux/TvSlice.js';

export default function TV() {
  let { tvs, currentPage } = useSelector(({ tv }) => tv);
  let dispatch = useDispatch();
  let nums = new Array(10).fill(0);

  async function getTvsF(page) {
    let { payload } = await dispatch(getTvs(page));
  }

  function decrease() {
    dispatch(decPage());
    currentPage--;
    getTvsF(currentPage);
  }

  function increase() {

    dispatch(incPage());
    currentPage++;
    getTvsF(currentPage);
  }

  useEffect(() => {
    getTvsF(1);
  }, [])

  return (
    <>
      <Helmet>
        <title>{`Noxi - TVs`}</title>
      </Helmet>
      <div className="container my-5 py-5">
        {tvs ?
          <div className="row">
            {tvs?.map((tv) => <div key={tv.id} className="col-md-3 col-6">
              <Link className='text-decoration-none text-white' to={`/itemdetails/tv/${tv.id}`}>
                <div className='position-relative my-3'>
                  <img src={`https://image.tmdb.org/t/p/w500` + tv.poster_path} className='w-100' alt={tv.title} loading='lazy' />
                  <h3 className='h5'>{tv.name}</h3>
                  <div className='bg-info position-absolute top-0 end-0 p-1'>
                    {tv.vote_average.toFixed(1)}
                  </div>
                </div>
              </Link>
            </div>)}
          </div> : <div className='container vh-100 d-flex justify-content-center align-items-center'><div class="spinner-border text-primary p-5" role="status"></div></div>}

        <nav>
          <ul className="pagination justify-content-center my-5">
            <li className="page-item"><Link onClick={decrease} className="page-link text-bg-primary shadow-none">Previous</Link></li>
            {nums.map((page, index) => <li key={index} onClick={() => { getTvsF(index + 1); dispatch(storeCurrentPage(index + 1)) }} className="page-item"><Link className={`page-link text-bg-primary shadow-none ${currentPage === index + 1 ? 'page-active' : ''}`}>{index + 1}</Link></li>
            )}
            <li className="page-item"><Link onClick={increase} className="page-link text-bg-primary shadow-none">Next</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}