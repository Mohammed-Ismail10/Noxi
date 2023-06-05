import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { falseAlert, falseLoading, postRegister, trueLoading } from '../../Redux/RegisterSlice.js';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Helmet from 'react-helmet';






export default function Register() {

  let { loading } = useSelector(({ register }) => register);
  let { alert } = useSelector(({ register }) => register);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  async function submit(values) {
    dispatch(trueLoading());
    console.log(values);
    let { payload } = await dispatch(postRegister(values));
    if (payload === undefined) {
      dispatch(falseAlert());
    }
    else {
      toast.success(`Register success`);
      navigate(`/login`);
    }
    console.log(payload);
    dispatch(falseLoading());
  }

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required').min(3, 'must be at least 3 characters').max(15, 'maximum 15 characters'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][0-9a-z]{5,10}$/, 'Password must be minimum 6 characters and maximum 11 character and start with capital letter')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number, must be egypt number like: 01012345678 حسبي الله على اللي سوا الباك اند')
      .required('Phone number is required'),
  });


  return (
    <>
      <Helmet>
        <title>{`Noxi - Register`}</title>
      </Helmet>
      <div className="container w-75 py-5 my-5">
        <h3 className='text-info'>Registration Now</h3>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
          }}
          validationSchema={FormSchema}
          onSubmit={submit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" className={`form-control${errors.name && touched.name ? ' is-invalid' : ''}`} id="name" name="name" placeholder="Enter your name" />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <Field type="email" className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`} id="email" name="email" placeholder="Enter your email address" />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`} id="password" name="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="mb-3">
                <label htmlFor="rePassword" className="form-label">Confirm Password</label>
                <Field type="password" className={`form-control${errors.rePassword && touched.rePassword ? ' is-invalid' : ''}`} id="rePassword" name="rePassword" placeholder="Confirm your password" />
                <ErrorMessage name="rePassword" component="div" className="invalid-feedback" />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <Field type="tel" className={`form-control${errors.phone && touched.phone ? ' is-invalid' : ''}`} id="phone" name="phone" placeholder="Enter your phone number" />
                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
              </div>
              {alert ? <Alert className='py-0 mb-3' severity="error">Account Already Exists</Alert> : null}
              {loading ? <div class="spinner-border text-primary" role="status">
              </div> : <button id="liveToastBtn" type="submit" className="btn btn-info" >Submit</button>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};