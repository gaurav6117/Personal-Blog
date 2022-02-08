import React, { useRef, useState } from 'react'
import { addProduct } from '../../config/Myservices'
import FileBase64 from 'react-file-base64';
export default function AddProduct() {
    const [state, setstate] = useState({ sub_images: ""})
    const [image, setimage] = useState()
    const product_nameref = useRef(null)
    const product_descref = useRef(null)
    const product_ratingref = useRef(null)
    const product_producerref = useRef(null)
    const product_costref = useRef(null)
    const product_dimensionref = useRef(null)
    const product_materialref = useRef(null)
    const product_stockref = useRef(null)
    const color_idref = useRef(null)
    const category_idref = useRef(null)
    const subimageselector = (e) => {
        setstate({ ...state, sub_images: e.target.files })
    }
    const addProductFunc = (e) => {
        e.preventDefault();
        var formData = new FormData();
        for (const key of Object.keys(state.sub_images)) {
            formData.append('sub_images', state.sub_images[key])
        }
        formData.append('product_image', JSON.stringify(image))
        formData.append('product_name', product_nameref.current.value)
        formData.append('product_desc',product_descref.current.value)
        formData.append('product_rating',product_ratingref.current.value)
        formData.append('product_producer',product_producerref.current.value)
        formData.append('product_cost',product_costref.current.value)
        formData.append('product_dimension',product_dimensionref.current.value)
        formData.append('product_material',product_materialref.current.value)
        formData.append('product_stock',product_stockref.current.value)
        formData.append('color_id',color_idref.current.value)
        formData.append('category_id',category_idref.current.value)
        addProduct(formData)
    } 
    return (
        <div className="container">
            <form>
                <input className="form-control" ref={product_nameref} placeholder="Name" type="text" />
                <FileBase64 className="form-control" multiple={false} onDone={(base64) => setimage(base64)} />
                <input className="form-control" onChange={subimageselector} placeholder="Sub_image" type="file" multiple />
                <input className="form-control" ref={product_descref} placeholder="description" type="text" />
                <input className="form-control" ref={product_ratingref} placeholder="rating" type="text" />
                <input className="form-control" ref={product_producerref} placeholder="Producer name" type="text" />
                <input className="form-control" ref={product_costref} placeholder="cost" type="number" />
                <input className="form-control" ref={product_dimensionref} placeholder="Dimension" type="text" />
                <input className="form-control" ref={product_materialref} placeholder="Material" type="text" />
                <input className="form-control" ref={product_stockref} placeholder="Stock" type="number" />
                <input className="form-control" ref={color_idref} placeholder="color ID" type="text" />
                <input className="form-control" ref={category_idref} placeholder="category ID" type="text" />
                <button onClick={addProductFunc} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}