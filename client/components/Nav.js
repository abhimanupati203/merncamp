import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

const Nav = () => {
  const [current, setCurrent] = useState('');
  const [state, setState] = useContext(UserContext);
  useEffect(()=>{
    process.browser && setCurrent(window.location.pathname);

  },[ process.browser && window.location.pathname])
  const router = useRouter();
  const logout = () => {
    window.localStorage.clear();
    setState(null);
    router.push('/login');
  }
  return (
    <ul className="nav d-flex justify-content-between" style={{ backgroundColor: 'blue' }}>
      <li>
        <Link href="/dashboard" legacyBehavior>
          <a className={`nav-link text-light brand-logo  ${current === '/dashboard'&&'active'}`}>TOMACHO</a>
        </Link>
      </li>
      {state != null ? (<>
        <li>
            <Link href="/" legacyBehavior>
              <a className={`nav-link text-light ${current === '/'&&'active'}`}>{state !=null && state.user && state.user.name}</a>
            </Link>
          </li>
        <a className={`nav-link text-light ${current === '/logout'}`}onClick={logout}>Logout </a></>) : (
        <>
          <li>
            <Link href="/login" legacyBehavior>
              <a className={`nav-link text-light ${current === '/login'}`}>Login</a>
            </Link>
          </li>
          <li >
            <Link href="/register" legacyBehavior>
              <a className={`nav-link text-light ${current === '/registerß'}`}> Register</a>
            </Link>
          </li></>)}
    </ul>

  )
}
export default Nav;


//how to handle expired token
//what happens after 7 days, user's token is expired?
//we can configure axios globally using interceptors
//so if there is error, logout user
