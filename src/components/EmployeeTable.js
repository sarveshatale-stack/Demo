import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
//import global from '../global'

const LOCAL_STORAGE_KEY = 'REACT.EMPLOYEES'
let flag = true;
function EmployeeTable(props)
{
    const [employee, getEmployeed] = useState([]);

    useEffect(()=>{
        PopulateEmployee();  
    }, [props.value]);

    const PopulateEmployee = ()=> {
        const locatStoredEmp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(locatStoredEmp)
        {
            getEmployeed(locatStoredEmp)
        }
    }

    const deleteEmployee = (id)=>{
        
        if (window.confirm("Are you sure? Click OK to delete this record.")) {
            var newEmployeeList = employee.filter(emp=> emp.id != id);
            getEmployeed(newEmployeeList);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newEmployeeList));
          }
    }

    // useEffect(()=>{
    //     //https://my-json-server.typicode.com/atulbhalerao/react_assignment
    //     //https://jsonplaceholder.typicode.com/
    //     //npm install —-save axios
    //     //npm install react-router-dom --saven
       
    //     axios.get('https://my-json-server.typicode.com/atulbhalerao/jsondb/employee')
    //         .then((res)=>{
    //             getEmployeed(res.data);
    //         });
        
    //         console.log(props);
    // }, [employee]);
   
    return (
    <>
        <div className= 'container'>
        {/* { props.value == '' ? <h2 className="primary-heading">Employee List</h2> : ''} */}
            <h2 className="primary-heading">Employee List</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th >Name</th>
                    <th >Job</th>
                    <th >Remove</th>
                </tr>
                </thead>
                <tbody>
                {
                    employee.map((item, index)=>{
                        return (
                        <tr key= {item.id}>
                            <td>{item.name}</td>
                            <td>{item.job}</td>
                            <td><input className="btn btn-primary" type="button" value="Delete" onClick= {() => deleteEmployee(item.id)}></input></td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    </>
    )
   
}
export default EmployeeTable

