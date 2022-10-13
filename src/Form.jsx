import React, { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css"
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  number: yup.string().required("number is requird").min(10).max(10),
  OTP: yup.string()
    .required("otp is required")
    .min(4).max(4)
    .matches(
      /^[1]\d{3}$/,
      "OTP must contain at 4 characters and starting with 1"
    )
});

const Form = () => {
  const [show, setShow] = useState(false);
const navigate= useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    alert("User Logged in successfully")
    navigate('/select-seats')
    reset();
  };
  const submitEffect = () => {
    setShow(true)
  }
  useEffect(()=>{
    setShow(false)
  },[])
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="title">Movie Login</div>
        <br />

        <input {...register("number")} placeholder="Enter Your Mobile Number" type="number" />
        <p>{errors.number?.message}</p>
        <br />

        {show  && <>
          <input
          {...register("OTP")}
          placeholder="OTP"
          type="password"
        />
        <p>{errors.OTP?.message}</p>
        </>
        }
        <br />

        <button type="submit" className="submit" onClick={submitEffect}>LogIN</button>
      </form>
    </div>
  );
};

export default Form;



