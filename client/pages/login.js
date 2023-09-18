import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import AuthForm from '../components/forms/AuthForm';
import { UserContext } from "../context"; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [state, setState] =useContext(UserContext);

    // const showModal = () => {
    //   setIsModalOpen(true);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log (email, password);
        try {
            setLoading(true);
            const { data } = await axios.post(`/login`, {
                email,
                password
            });
            setState({
                user:data.user,
                token:data.token
            });
            window.localStorage.setItem('auth', JSON.stringify(data));
            setEmail('');
            setPassword('');
            setLoading(false);
            router.push('/');
        } catch (err) {
            console.log(err);
            // toast.error(err.response.data);
            // setLoading(false);
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
                    <h1>Login page</h1>
                </div>
            </div>
            {loading ? <h1>Loading</h1> : ''}
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">

                    <AuthForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loading={loading}
                        page="login"

                    />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <p className='text-center'>
                      <a className="text-danger" onClick={(e)=>{ e.preventDefault(); router.push('/forgot-password')}}>    Forgot password?</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login;