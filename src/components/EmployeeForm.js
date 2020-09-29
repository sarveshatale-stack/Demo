import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import EmployeeList from './EmployeeList';
import axios from 'axios'

const LOCAL_STORAGE_KEY = 'REACT.EMPLOYEES'
const initialObj = { name: '', job: '', id: 0 }
let flag = true;
function EmployeeForm(props)
{
    //console.dir(props.match.params.id);
    const [employee, setemployee] = useState(initialObj);

    useEffect(()=>{


    }, [employee]);
    
    const Insertemployee = (e)=>{
        
        if(!employee.name || !employee.job)
        {
            alert('Please enter name and job');
            return;
        }
        if(employee.id === 0)
        {
            let emp = {...employee} // copying the old datas array

            const locatStoredEmp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            if(locatStoredEmp)
            {
                var newId = getMax(locatStoredEmp, 'id').id + 1;
                emp.id = newId;
                locatStoredEmp.push(emp);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locatStoredEmp));
            }
            else
            {
                emp.id = 1;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([emp]));
            }
            setemployee(initialObj);
            flag = !flag;
            // axios.get('https://my-json-server.typicode.com/atulbhalerao/react_assignment/employee')
            // .then((res)=>{
            //    if(res.data)
            //    {
            //         //var newId = getMax(res.data, 'id').id + 1;
            //         let emp = {...employee} // copying the old datas array
            //         //emp.id = newId;
            //         setemployee(emp);
            //         axios.post('https://my-json-server.typicode.com/atulbhalerao/react_assignment/employee', emp)
            //             .then((postRes)=>{
            //                console.dir(postRes);
            //                props.history.push('/EmployeeList')  
            //                //return <Redirect to='/EmployeeList'/>;
            //             });
            //    }
            // });
        }
        else
        {
            // console.dir('update employee');
            // console.table(employee);
        }
    };

    const onChange = (e) => {  
        e.persist();
        setemployee({...employee, [e.target.id]: e.target.value});  
      }  

    //Added function to get max id
    function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }
    //Added function to get max id

    return(
        <>            
            <div className= 'container'>
                { <EmployeeList value = { flag }></EmployeeList> }
                <h2 className="primary-heading">Add New Employee</h2>
                <form onSubmit={ Insertemployee }></form>
                    <div className="form-row" >
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6 text-left" >
                            <label htmlFor="txtName" className="font-weight-bold">Name</label> <br/>
                            <input type="text" className="form-control" 
                                id="name" placeholder="Enter name" 
                                onChange={ onChange }
                                value={employee.name}></input>
                            
                        </div>
                        
                        <div className="col-md-3"></div>
                    </div>
                    <div className="form-row" >
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6 text-left" >
                            <label htmlFor="txtJob" className="font-weight-bold">Job</label> <br/>
                            <input type="text" className="form-control" 
                                id="job" placeholder="Enter job" 
                                onChange={ onChange }
                                value={employee.job}></input>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <div className="form-row" >
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6 text-left" >
                            <input className="btn btn-primary" type="submit" value="Submit" onClick= {Insertemployee}></input>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
            </div>
        </>
    ) 
}

export default EmployeeForm
