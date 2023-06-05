import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { falseAlert, falseLoading, saveUserData, trueLoading } from '../../Redux/LoginSlice.js';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postLogin } from '../../Redux/LoginSlice.js';
import Helmet from 'react-helmet';



export default function Login() {

  let { loading } = useSelector(({ login }) => login);
  let { alert } = useSelector(({ login }) => login);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  async function submit(values) {
    dispatch(trueLoading());
    let { payload } = await dispatch(postLogin(values));
    if (payload === undefined) {
      dispatch(falseAlert());
    }
    else {
      localStorage.setItem('token', payload.token);
      dispatch(saveUserData());
      toast.success(`Login success`);
      navigate(`/`);
    }
    dispatch(falseLoading());
  }

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][0-9a-z]{5,10}$/, 'Password must be minimum 6 characters and maximum 11 character and start with capital letter')
      .required('Password is required'),
  });

  return (
    <>
      <Helmet>
        <title>{`Noxi - Login`}</title>
      </Helmet>
      <div className="container w-75 py-5 my-5">
        <h3 className='text-info'>Login Now</h3>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={FormSchema}
          onSubmit={submit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
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

              {alert ? <Alert className='py-0 mb-3' severity="error">Email or password is not correct</Alert> : null}
              {loading ? <div class="spinner-border text-primary" role="status">
              </div> : <button id="liveToastBtn" type="submit" className="btn btn-info" >Submit</button>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};