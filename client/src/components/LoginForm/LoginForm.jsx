import React from "react";
import { Field } from "redux-form";
import { RenderForm } from "../RenderForm";

export const LoginForm = (props) => {
  const renderInput = ({ input, label, type }) => {
    return (
      <div>
        <label className="text-white text-left my-2">{label}</label>
        <input
          className="form-control"
          placeholder={label}
          {...input}
          type={type}
          required
        />
      </div>
    );
  };

  const handleForm = (formValues) => {
    props.handleForm(formValues);
  };

  return (
    <RenderForm handleForm={handleForm}>
      <div className="ui stacked element">
        <Field
          name="username"
          component={renderInput}
          label="Username"
          type="text"
        />
        <Field
          name="password"
          component={renderInput}
          label="Password"
          type="password"
        />
        <button className="btn btn-md btn-secondary btn-block my-4 mx-auto w-25">
          Submit
        </button>
      </div>
      <div className="d-flex w-100 justify-content-center text-white">
        <div className="col">
          <p className="m-0 p-0">Sample User Credentials</p>
          <p className="m-0 p-0">Username: sampleuser</p>
          <p className="m-0 p-0">Password: examplepass000</p>
        </div>
      </div>
    </RenderForm>
  );
};
