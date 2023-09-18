import {Avatar} from 'antd';

const CreatePostForm = ({content, setContent, postSubmit}) => {

    return (<div className="card">
        <div className="card-body pb-1">
            <form className='form-group' > 
                <textarea 
                className='form-control' 
                value={content} 
                onChange={(e)=>setContent(e.target.value)}  
                placeholder='Write something...'></textarea>
            </form>
        </div>
        <div className='card-footer'>
            <button className='btn btn-primary mt-1' onClick={postSubmit}>Post</button>
        </div>
    </div>)
}
export default CreatePostForm;