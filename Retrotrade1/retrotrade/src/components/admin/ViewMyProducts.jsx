import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {CustLoder} from "../common/CustLoder"

export const ViewMyProducts = () => {

  const[products, setproducts] = useState([])
  const [isLoding, setisLoding] = useState(false)
  const getAllMyProducts = async() =>{

    setisLoding(true)    
    const res = await axios.get("/product/getProductsbyuserid/"+localStorage.getItem("id"))
    console.log(res.data)
    setproducts(res.data.data)
    setisLoding(false)
  }

  useEffect(() => {
        
    getAllMyProducts()
    
}, [])
  return (
    <div style={{textAlign:"center"}}>
    {
        isLoding && <CustLoder/>
    }
    MY PRODUCTS
    <table className='table table-dark'>
        <thead>
            <tr>
                <th>productName</th>
                <th>IMAGE</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {
               products?.map((sc)=>{
                return<tr>
                    <td>{sc.productName}</td>
                    <td>
                        <img  style ={{height:100,width:100}}src={sc?.productURL}></img>
                    </td>
                    <td>
                        <Link to ={`/admin/updateProduct/${sc._id}`} className ="btn btn-info">UPDATE</Link>
                        </td>
                </tr>
               }) 
            }
        </tbody>
    </table>
</div>
)
}
