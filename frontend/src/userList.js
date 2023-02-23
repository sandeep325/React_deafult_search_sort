import React, { useState ,useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
const UserList=()=>{
  const [sortName,setsortName]= useState(true);
  const [sortEmail,setsortEmail]= useState(false);
  
    const includesKeys = ["name","email"]
    const [userList,setUserList]=useState([]);
    const [preUserList,setPreUserList]=useState([]);

    useEffect(() => {
        UserListCall();
      // return () => {
      //   cleanup
      // };
    }, []);



    const UserListCall = async() =>{
      const response = await axios.get(process.env.REACT_APP_API_SERVER_PORT + 'users');
      console.log(response);
      if (response.data.status === 200) {
        setUserList(response?.data?.data);setPreUserList(response?.data?.data);
    } else {
        console.log(response.error);
    }
    }

    const searchEvent = (e) => {
        let value = e?.target?.value?.toLowerCase()?.trim();
        filterFunction(value);
      };
    
     const filterFunction=(value) =>{
        if (!value) {
            setUserList(preUserList)
        } else {
          let filterData = preUserList.filter(fl => {
            return Object.keys(fl).some(key => {
              return includesKeys?.includes(key) ? fl[key].toString().toLowerCase().includes(value) : false
            })
          })
          setUserList(filterData)
        }
      }

      const sortFun=(title)=>{

        if (title === 'name') {
          setsortName(!sortName);
          if (sortName === false) {
            // a to z 
            var AEsrt = userList;
            console.log(AEsrt);
            AEsrt.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);
            setUserList(AEsrt);
          }
          else if(sortName === true) {
            var AEsrt = userList;
            console.log(AEsrt);
            AEsrt.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : -1);
            setUserList(AEsrt);

          }
    
        }

        if (title === 'email') {
          setsortEmail(!sortEmail);
          if (sortEmail === false) {
            // a to z 
            var AEsrt = userList;
            AEsrt.sort((a, b) => (a.email.toUpperCase() > b.email.toUpperCase()) ? 1 : -1);
            setUserList(AEsrt);
          }
          else if(sortEmail === true) {
            var AEsrt = userList;
            AEsrt.sort((a, b) => (a.email.toUpperCase() < b.email.toUpperCase()) ? 1 : -1);
            setUserList(AEsrt);
          }
    
        }
      }

    return<React.Fragment>
         <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6" style={{margin:'audo'}}><br/>
                <input type="text" onChange={searchEvent} className="form-control" style={{width:300}} placeholder="search kewords"/>
                <Link to ="/">Create User</Link>
                <br/>
            <table class="table dark"  >
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col" onClick={()=>sortFun('name')}>Name
                        <span>{sortName === false ? <span>&darr;</span> : <span>&uarr;</span>}</span>
                        
                        </th>
                        <th scope="col" onClick={()=>sortFun('email')}>Email
                        <span>{sortEmail === false ? <span>&darr;</span> : <span>&uarr;</span>}</span>
                        </th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                  {userList.length >0 ? <>
                    {userList?.map((val,i)=><tr key={i}>
                    {/* <td>{val?.id}</td> */}
                    <td>{i+1}</td>
                    <td>{val?.name}</td>
                    <td>{val?.email}</td>
                    <td><img src={val?.image} alt="User image" width={90} height={45}/></td>
                </tr>)}
                </>: <><tr style={{color:"red", textAlign:"center"}}><h4>No Record...</h4></tr></>}
                
                </tbody>
            </table>
            </div>
            <div className="col-md-3"></div>
        </div>
    </React.Fragment>
}

export default UserList;