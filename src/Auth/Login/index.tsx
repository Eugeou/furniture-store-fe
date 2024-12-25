'use client';

import AppLoading from '../../shared/components/app-loading/AppLoading';

import { useAuth } from '../../Api/hooks/useAuth';
import { selectAuth } from '../../redux-setup/slice/auth.slice';
import { useAppSelector } from '../../Api/types/redux/redux';
import { StoreLogin } from '../../Api/types/entities/auth-entity';


import { Col, Form, Input, Row, Typography, Button } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/navigation'
import {motion} from 'framer-motion'
//import useSessionAuth from '@/hooks/useSessionAuth';
import { toast } from 'react-toastify';
// import { SessionProvider } from 'next-auth/react';


const LoginPage = () => {
  const { onLogin, isLoading } = useAuth()

  const [form] = Form.useForm()
  const handleSubmit = async (values: StoreLogin) => {
    await onLogin(values)
    console.log('values: ', values , 'isLoading: ', isLoading)
  }
  const { user } = useAppSelector(selectAuth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) navigate('/')
  }, [user])

//   const { onLogin, isLoading } = useSessionAuth();
//   const [form] = Form.useForm();
//   const handleSubmit = async (values: StoreLogin) => {
//     try {
//       const result = await onLogin(values);
//       console.log('result: ', result);
//       toast.success("Login successfully");
//     } catch (error) {
//       toast.error("Internal error during login " + error);
//     }
    
//   };


return (
  <div className="login-page vw-100 vh-100 d-flex justify-content-center align-items-center bg-opacity-75 bg-center bg-no-repeat flex-column gap-3 p-5" style={{ backgroundColor: "#3b5d50", borderRadius: "20px" }}>
    {isLoading && <AppLoading />}
    <div className="shadow p-4 bg-opacity-45 bg-white backdrop-blur" style={{ width: '50%', backdropFilter: 'blur(10px)', borderRadius: "20px"
     }}>
      <div className="row g-3">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="h3 fw-bold text-center text-primary">Login</h1>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="row g-3">
              <div className="col-12">
                <Form.Item
                  name="email"
                  label={<h2 className="fw-semibold fs-5 text-primary">User name</h2>}
                  rules={[{ required: true, message: 'Vui lòng nhập username' }]}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17, duration: 0.5 }}
                  >
                    <Input
                      className="form-control fs-5 py-2"
                      type="email"
                      placeholder="Nhập email của bạn"
                    />
                  </motion.div>
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item
                  name="password"
                  label={<h2 className="fw-semibold fs-5 text-primary">Password</h2>}
                  rules={[{ required: true, message: 'Vui lòng nhập password' }]}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17, duration: 0.5 }}
                  >
                    <Input
                      className="form-control fs-5 py-2"
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                    />
                  </motion.div>
                </Form.Item>
                <Link to="/forgot-password">
                  <Typography.Text className="fs-5 text-primary text-decoration-underline">Forgot password</Typography.Text>
                </Link>
              </div>

              <div className="col-12 p-4 mt-5">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17, duration: 1 }}
                >
                  <button
                    //type="primary"
                    //htmlType="submit"
                    className="w-100 border-0 p-3"
                    //loading={isLoading}
                    style={{ backgroundColor: "#3b5d50" }}
                  >
                    <Typography.Text className="fs-5 fw-semibold text-white">Đăng nhập</Typography.Text>
                  </button>
                </motion.div>
              </div>
            </div>
          </Form>
        </div>

        {/* <div className="col-md-6 d-flex justify-content-center">
          <Image src="/bg-3.png" preview={false} width={400} height={400} />
        </div> */}
      </div>
    </div>
  </div>
);

}

export default LoginPage
