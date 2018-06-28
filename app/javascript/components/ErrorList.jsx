import React from "react";

function ErrorList(props) {
  const errors = props.errors
  const errorItems = errors.map((error, index) => <span key={index}>{error}</span>);
  return (
    <div>
    { errors.length > 0 && 
      <div id={props.id} className="alert alert-danger" role="alert">
        {errorItems}
      </div> 
    }
    </div>
  );

}
export default ErrorList;