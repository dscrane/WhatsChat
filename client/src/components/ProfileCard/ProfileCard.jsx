/* IMPORTS */
import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Field } from "redux-form";
import { RenderForm } from "../RenderForm";
import { pencilIcon } from "../../icons/icons";
import "./profileCard.css";
/* ------ */

export const ProfileCard = ({ auth, updateUser, logout, setModalDisplay }) => {
  const [editing, setEditing] = useState("");

  const handleForm = async (formValues) => {
    await updateUser(formValues);
    setEditing("");
  };

  const renderSubmitButton =
    editing === "" ? null : (
      <ListGroup.Item className="profile__row">
        <button type="submit" className="profile__submit button">
          Update
        </button>
      </ListGroup.Item>
    );

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={`row__content ${className}`}>
        <div className="content__col content__col-label">
          <label className="profile__label">{label}</label>
        </div>
        <div className="content__col content__col-input">
          {editing === label ? (
            <input className="profile__input form-control" {...input} />
          ) : (
            <input
              className="profile__input-placeholder form-control-plaintext"
              placeholder={meta.initial}
            />
          )}
        </div>
        <div className="content__col content__col-cta">
          <div
            onClick={() =>
              editing === label ? setEditing("") : setEditing(label)
            }
            className="profile__cta-edit"
          >
            {editing === label ? "\u2715" : pencilIcon}
          </div>
        </div>
        {renderError(meta)}
      </div>
    );
  };

  return (
    <Card className="profile__card">
      <Card.Img
        className="profile__avatar"
        variant="top"
        src={`data:image/png;base64,${auth.data.avatar}`}
      />
      <Card.Body className="profile__body">
        <RenderForm
          handleForm={handleForm}
          initialValues={_.pick(
            auth.data,
            "name",
            "username",
            "email",
            "password"
          )}
        >
          <ListGroup className="profile__content" variant="flush">
            <ListGroup.Item className="profile__row">
              <Field name="name" component={renderInput} label="Name:" />
            </ListGroup.Item>
            <ListGroup.Item className="profile__row">
              <Field
                name="username"
                component={renderInput}
                label="Username:"
              />
            </ListGroup.Item>
            <ListGroup.Item className="profile__row">
              <Field name="email" component={renderInput} label="Email:" />
            </ListGroup.Item>
            <ListGroup.Item className="profile__row">
              <Field
                name="password"
                component={renderInput}
                label="Password:"
              />
            </ListGroup.Item>
            {renderSubmitButton}
          </ListGroup>
        </RenderForm>
      </Card.Body>
      <Card.Footer className="profile__footer">
        <ListGroup className="profile__row" variant="flush">
          <ListGroup.Item className="profile__row">
            <div className="row justify-content-around">
              <div className="col text-center">
                User Since: {moment(auth.data.createdAt).format("MMM 'YY")}
              </div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="profile__row">
            <button
              onClick={() => logout()}
              className="profile__cta profile__cta-logout button"
            >
              Log Out
            </button>
          </ListGroup.Item>
          <ListGroup.Item className="profile__row">
            <button
              onClick={() => setModalDisplay(true)}
              className="profile__cta profile__cta-delete button"
              disabled={auth.data._id === "5f637fdd0a41ae691c828e50"}
            >
              Delete Account
            </button>
          </ListGroup.Item>
        </ListGroup>
      </Card.Footer>
    </Card>
  );
};
