import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from 'react-router-dom';



const Registration = () => {
    const [name,setName]=useState("");
    // console.log(name);
    const[photo,setFile]=useState("");
    // console.log(photo);
    const[dob,setDob]=useState("");
    // console.log(dob);

    const history = useNavigate();
    const setdata = (e)=>{
        const {value}=e.target;
        setName(value);
    }
    const setdate = (e)=>{
        const {value}=e.target;
        setDob(value);
    }
    const setimgfile =(e)=>{
        setFile(e.target.files[0]);
    }



    const addUserData = async(e)=>{
        e.preventDefault();

        var formData = new FormData();
        formData.append("name",name);
        formData.append("photo",photo);
        formData.append("dob",dob);

        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

        const res = await axios.post("/registration",formData,config);


        if(res.data.status===401 || !res.data){
            console.log("error");
        }
        else{
            history("/")
        }
    }
  return (
    <>
        <div className='container mt-3'>
            <h3>Register User Details</h3>
            
                <Form className='mt-3'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' onChange={setdata} placeholder="Name" />
                        <Form.Text className="text-muted">
                        Example:SUKESH T N
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" onChange = {setdate}  name='dob' placeholder="date" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange = {setimgfile} name='photo' placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
        <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
        </Button>
        </Form>
        </div>
    </>
  )
}

export default Registration