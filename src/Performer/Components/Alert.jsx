import React, {useState} from "react";

const Alert = ({ color,text }) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className={
            "text-white px-6 py-4 border-0 rounded fixed  inset-x-0 top-0 mb-4 bg-yellow-600"
          }
        >

          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Warning!<br></br></b>{text}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default function ClosingAlert(text) {
  return (

     <Alert color="pink" text={text}/>

  );
}