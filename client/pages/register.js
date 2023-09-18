import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import { Link } from 'next/link';
import { useRouter } from "next/router";
import AuthForm from '../components/forms/AuthForm';
import { UserContext } from "../context"; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        console.log(name, email, password, secret);
        try {
            setLoading(true);
            const { data } = await axios.post(`/register`, {
                name,
                email,
                password,
                secret
            });
            if(data.errror){
                toast.error(data.error);
            }
            setName('');
            setEmail('');
            setPassword('');
            setSecret('');
            setIsModalOpen(data.ok);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data);
            setLoading(false);
            toast.error(err.response.data);
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
                    <h1>Register page</h1>
                </div>
            </div>
            {loading ? <h1>Loading</h1> : ''}
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">

                    <AuthForm 
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    secret={secret}
                    setSecret={setSecret}
                    loading={loading}
                    setLoading={setLoading}

                    />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                  <p className='text-center'> 
                  Already registered? <a onClick={(e)=>{ e.preventDefault(); router.push('/login')}}>Login</a>
                  </p>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    {/* <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button> */}
                    <Modal title="Congratulations" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>User created succesfully</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Register;