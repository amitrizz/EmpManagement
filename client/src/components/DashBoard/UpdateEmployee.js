import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import Navbar from '../Navbar';
import { useNavigate } from "react-router-dom"



function UpdateEmployee() {
    const location = useLocation();
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const [fullname, setName] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDOB] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        const state = location.state || {};
        if (state) {

            setId(state.id)
        }
    }, []);


    const HandleSubmit = async () => {
        console.log(id);
        try {
            const headers = {
                'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
                'Content-Type': 'application/json'
                // Add any other headers you need
            };

            if (!fullname || !age || !dob || !salary || !department) {
                alert("Enter All Fields");
            } else {
                // console.log();
                const response = await axios.post(`/api/Employee/update-employee`, { fullname, age, dob, salary, department, id }, { headers: headers });
                console.log(response);
                if (response.status == 200) {
                    alert(`Submit Successfully`)
                    navigate("/AllEmployee")
                } else {
                    console.log(response.status);
                }
            }
            // // console.log(response);
            // alert("Employee Update Sucessfully")
            // navigate("/AllEmployee")
            // setAllemployee(response.data.employees)
            // setName(response.data.user.name); 
            // setEmail(response.data.user.email)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }
    return (
        <>

            <div className='addemployee'>
                <Navbar className="navbar" />
                <div className='sidebar'>
                    <h1>Update EMPLOYEE</h1>
                    <div className='form'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Employee Name</label>
                            <input maxLength={30} type="text" class="form-control" onChange={e => setName(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Age</label>
                            <input maxLength={30} type="number" class="form-control" onChange={e => setAge(e.target.value)} />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Date of Birth</label>
                            <input max="2005-01-01" type="date" class="form-control" onChange={e => setDOB(e.target.value)} />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Salary</label>
                            <input maxLength={30} type="number" class="form-control" onChange={e => setSalary(e.target.value)} />
                        </div>

                        <select value={department} onChange={handleDepartmentChange} className='selectStyle'>
                            <option value="">Select an option</option>
                            <option value="IT">IT</option>
                            <option value="Sales">Sales</option>
                            <option value="Production">Production</option>
                            <option value="Field">Field</option>
                            <option value="Canteen">Canteen</option>
                        </select>

                        <button onClick={HandleSubmit} class="btn btn-outline-secondary">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployee
