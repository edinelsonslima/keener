import React from "react";
import Popup from "reactjs-popup";
import Form from "../../pages/form";

export default (props) => (
  <Popup modal nested open={props.open ?? false} close={props.close}>
    {(close) => (
        <Form close={() => close()} id={props.id} update={props.update}/>
    )}
  </Popup>
);
