import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import Dropzone from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {CBadge, CButton, CCard, CCardBody, CCardFooter, CCardImage, CCardTitle, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { ApiCall } from "./ApiCall";
const CreateUser = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState(""); 
    const [name, setname] = useState("");
    const [filName, setFilName] = useState("");
    const [errMsg, setErrmsg] = useState({ color: "", msg: "" });
    const [errMsg1, setErrmsg1] = useState({ color: "", msg: "" });
    const [errMsg3, setErrmsg3] = useState({ color: "", msg: "" });

    const HandleChange = (e) => {
        console.log(e.target.name);
        if (e.target.name === "name") {
            var inputname = e.target.value;
            setname(inputname);
          }

        if (e.target.name === "email") {
          var inputEmial = e.target.value;
          setEmail(inputEmial);
        }
        
    
      }

    const CreateUsr =  (e) =>{
        e.preventDefault();
         if(name ===""){
            setErrmsg1({});
            setErrmsg1({ color: "red", msg: "Name must be required." });
          setTimeout(() => { setErrmsg1({}) }, 4000);
          return false;
         }
        var emailfilter = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if ((email === "") || (!(emailfilter.test(email)))) {
          setErrmsg({});
          setErrmsg({ color: "red", msg: "Invalid Email." });
          setTimeout(() => { setErrmsg({}) }, 4000);
          return false;
        }
        else {
          setErrmsg({});
          setTimeout(() => { setErrmsg({}) }, 4000);
        }

        // console.log(filName);
          if(filName ==" ") {setErrmsg3({ color: "red", msg: `Image should be required.`}); setTimeout(() => { setErrmsg3({}) }, 4000); return false; }
        if (filName !== '') {
            const validateImg = ['image/jpeg','image/png' , 'image/gif' ,'image/x-icon', 'image/ico'];
            if (!validateImg.includes(filName.type) ) {
              setErrmsg3({ color: "red", msg: `Only support file (.jpeg, .png, .jpg, .gif , .ico)`}); setTimeout(() => { setErrmsg3({}); setFilName(''); }, 4000); return false;
            }  else { setErrmsg3({}); }
          }
         
        const form = new FormData(); 
        form.append('name',name );
        form.append('email',email);
        form.append('image',filName);
        ApiCall.createUsrs(form).then(res=>{
            if(res && res.status===201){
              toast.success(res?.message, { autoClose: 500, position: toast.POSITION.TOP_RIGHT });
              setTimeout(()=>{
                setEmail(""); setname(""); setFilName("");
                    Navigate("/user_list");
              },1000)
          
            }  //
          })
    
    }
    return <React.Fragment>
        <div className="container">
            <div className="row">
                <h2> Create Users <span className="show-users" ><Link to="/user_list">Show users&rarr;</Link></span></h2>
            </div>
            <input type="text" name="name" className="form-control" placeholder="Name" onChange={HandleChange} autoComplete="off"/>
            <span style={{ color: errMsg1.color }}>{errMsg1.msg}</span>
            <br />
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={HandleChange} autoComplete="off"/>
            <span style={{ color: errMsg.color }}>{errMsg.msg}</span>
            <br />
            {/* <input type="file" name="file" className="form-control" placeholder="file" /><br />
             */}
             <CFormLabel htmlFor="iconfile" className="col-form-label" name="image" >Icon File <span style={{color:"red",fontSize:"12px"}}>(Supported file formats: .jpg, .png, .ico, .gif ) *</span></CFormLabel>
             <Dropzone onDrop={acceptedFiles => {

setFilName(acceptedFiles[0])
}}>
{({ getRootProps, getInputProps }) => (
  <section>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p id="dragdrop">{filName !== "" ? <><span>{filName['name']}</span></> : 'Click to select your files'}</p>
    </div>
  </section>
)}
</Dropzone>

<h6><span style={{ color: errMsg3.color }}>{errMsg3.msg}</span></h6>
     <button type="button" className="form-control btn btn-success shadow-none float-left" onClick={CreateUsr}> Create</button>
        </div>
       



    </React.Fragment>
}
export default CreateUser;