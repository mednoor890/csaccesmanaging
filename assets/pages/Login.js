

import React, {useContext, useState} from 'react';
import {useFormik} from "formik";
import Swal from "sweetalert2";
import styled from "styled-components"
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
const Wrapper=styled.div`
position:absolute;
top:50%;
left:50%;
transform: translate(-50%,-50%);
background-color:#2BA4FB;
border : solid 1px; 
opacity:0.8;
border-radius:6px;
border-color:white;

`
const Form=styled.form`
width:90%;
padding:24px;
`
export const Tipography=styled.label`
margin-left:5%;

font-size:20px;
font-weight: bolder;
`
export const Inputa = styled.input`
  font-size: 18px;
  color:black;
  padding: 10px;
  margin-left:7px;
  width:400px;
  background: white;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: black;
  }
`;
export const FormButton=styled.button`
display: block;
width: 60%;
padding: 12px 0;
font-family: inherit;
font-size: 14px;
font-weight: 700;
color: white  ;
background-color:  #722BD6 ;
border: 2px groove;
border-color:#4696FE;
box-shadow: 0 10px 10px rgba(100, 100, 100, 0.9);
cursor: pointer;
transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
margin-left:85px;
margin-bottom:12px;
margin-top:20px;
&:hover {
  box-shadow: 0 15px 15px rgba(50, 70, 80, 0.9);
  transform: translateX(0, -5px);
  background-color:#39D62B ;
  font-size:22px;
  color:black ;
}
`
const Alerts=styled.h6`
color:red;
margin-left:30px;
`
const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 4 ) {
        errors.password = 'At least 4 characters';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
}
const Login = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext); //make a context dir and a file within it


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [error, setError] = useState("");

    const formik =useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate,
        onSubmit: async (values ) => {
            try {
                await AuthAPI.authenticate(values)
                .then(function(response)
                {Swal.fire({
                    icon: 'success',
                    title: 'Authenticated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                                  }
                )})
                setError("");
                setIsAuthenticated(true);
                history.replace("/");
            } catch (error) {
                Swal.fire({
                    icon:'error',
                    title: 'Invalid credentials please enter valid ones!',
                    timer:1500,
                    showConfirmButton: false,

                })
                setError("Invalid password or/and Invalid Email ");

            }


        }
    })
    return (
        <Wrapper>
            <Form onSubmit={formik.handleSubmit}>
                <Tipography htmlFor="email">Email Address</Tipography><br/>
                <Inputa

                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                />
                {formik.errors.email ? <Alerts>{formik.errors.email}</Alerts> : null
                }<br/>




                <Tipography htmlFor="password">Password</Tipography><br/>
                <Inputa

                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <Alerts>{formik.errors.password}</Alerts> : null
                } <br/>
                <FormButton type="submit">Submit</FormButton>

            </Form>
        </Wrapper>
    );
}

export default Login
