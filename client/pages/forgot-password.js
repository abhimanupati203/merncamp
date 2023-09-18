import { useState, useContext } from 'react';
import axios from 'axios';
import {  Modal } from 'antd';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { UserContext } from "../context"; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [state] =useContext(UserContext);
    // const showModal = () => {
    //   setIsModalOpen(true);
    // };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/forgot-password`, {
                email,
                newPassword,
                secret
            });
            console.log("forgot password", data);
            // setEmail('');
            // setPassword('');
            // setSecret('');
            // setIsModalOpen(data.ok);
            // setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data);
            setLoading(false);
        }
        // .then((res)=>{
        //     console.log(res);
        //     setok(res.data.ok);

        // }).catch(err=>{ toast.error(err.response.data);})
    }
    if(state && state.token) router.push('/');
    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image  text-light ">
                <div className="col text-center">
                    <h1>Forgot Password page</h1>
                </div>
            </div>
            {loading ? <h1>Loading</h1> : ''}
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">

                    <ForgotPasswordForm 
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    secret={secret}
                    setSecret={setSecret}
                    loading={loading}
                    setLoading={setLoading}

                    />
                </div>
            </div>


            <div className='row'>
                <div className='col'>
                    {/* <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button> */}
                    <Modal title="Congratulations" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Congrats you can now login with new password</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;