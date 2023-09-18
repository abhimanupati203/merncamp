
import { SyncOutlined } from '@ant-design/icons';

const ForgotPasswordForm = ({      
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    secret,
    setSecret,
    loading,
    page
}) => {
console.log('loading value', loading);

return (<form className="row g-3" onSubmit={handleSubmit}>
  


        <div className="form-group p-2">
            <label className="text-muted"> Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
        </div>
        <div className="form-group p-2">
            <label className="text-muted"> New Password</label>
            <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
        </div>
  
        <>

        <div className="form-group p-2">
            <small>
                <label className="text-muted"> Pick a question</label>
            </small>
            <select className="form-control" >
                <option>What is your favourite color?</option>
                <option>What is your best friend's name?</option>
                <option>What cuty you were born?</option>
            </select>

        </div>
        <div className="form-group p-2">
            <small>
                You can use this reset your password if forgotten
            </small>
            <input type="text" className="form-control" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Enter your answer here" />
        </div>
        </>
         


        <div className="col-12">
            <button type="submit" className="btn btn-primary col-12" disabled={ !email || !newPassword } >{loading ? <SyncOutlined spin  className='py-1'/> : 'Submit'}</button>
        </div>
    </form>)
}

export default ForgotPasswordForm;