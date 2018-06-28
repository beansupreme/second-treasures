import React from "react"

function MessageBox(props) {
  const message = props.message
  return (
    <div>
    { message && 
      <div id={props.id}  className="alert alert-success" role="alert" >
        {message}
      </div> 
    }
    </div>
  );
}

export default MessageBox;