import React, { useRef } from 'react'
import { addColor } from '../../config/Myservices'
export default function AddColor() {
    const Nameref = useRef(null)
    const coderef = useRef(null)
    const addColorFunc = (e) => {
        e.preventDefault();
        const data = { color_name: Nameref.current.value, color_code: coderef.current.value }
        addColor(data)
    }
    return (
        <div className="container">
            <form>
                <input className="form-control" ref={Nameref} placeholder="Color Name" type="text" />
                <input className="form-control" ref={coderef} placeholder="Color code" type="text" />
                <button onClick={addColorFunc} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}