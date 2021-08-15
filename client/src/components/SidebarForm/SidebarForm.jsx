import React from "react";
import { plusIcon } from "../../icons/icons";
import "./sidebarForm.css";

export const SidebarForm = (props) => {
  const onChange = (e) => {
    props.onChange(e);
  };

  const handleForm = (e) => {
    props.handleForm(e);
  };

  const errorStyle =
    props.newRoomName.length < 5 && props.newRoomName.length !== 0
      ? "is-invalid"
      : null;

  return (
    <form className="sidebar__form" onSubmit={handleForm}>
      <div className="sidebar__form_col sidebar__form_col-start">
        <input
          value={props.newRoomName}
          onChange={onChange}
          className={`sidebar__form_input form-control ${errorStyle}`}
          type="text"
          placeholder={"Start new chat"}
          name="chatForm"
          required
        />
      </div>
      <div className="sidebar__form_col sidebar__form_col-end">
        <button type="submit" className="sidebar__cta-new">
          {plusIcon}
        </button>
      </div>
    </form>
  );
};
