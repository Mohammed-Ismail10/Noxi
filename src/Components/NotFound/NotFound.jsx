import React from 'react'
import Helmet from 'react-helmet'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>{`Noxi - Not Found`}</title>
      </Helmet>
      <div className="container py-5 my-5">
        <h2 className='pb-2'>Not Found</h2>
        <p>This page doesn't exist.</p>
      </div>
    </>
  )
}
