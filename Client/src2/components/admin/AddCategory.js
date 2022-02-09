import React, { useRef,useState } from 'react'
import { addCategory } from '../../config/Myservices'
import FileBase64 from 'react-file-base64';
export default function AddCategory() {
    const [image, setimage] = useState()
    const Nameref = useRef(null)
    const addCategoryFunc = (e) => {
        e.preventDefault();
        const data = { category_name: Nameref.current.value, category_image:image}
        addCategory(data)
    }
    return (
        <div className="container">
            <form> 
                <input className="form-control" ref={Nameref} placeholder="Name" type="text" />
                <FileBase64 className="form-control" multiple={false} onDone={(base64) => setimage(base64)} />
                <button onClick={addCategoryFunc} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}