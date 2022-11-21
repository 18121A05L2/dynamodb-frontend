import React from "react";

function Employee({ emp, funDelete, funUpdate }) {
  function handleDelete() {
    funDelete(emp.id);
  }

  function handleUpdate() {
    funUpdate(emp);
  }
  return (
    <div className="flex  gap-3">
      <div className="flex w-full justify-between  bg-orange-200 rounded-lg p-2  ">
        <p>{emp?.id}</p>
        <p>{emp?.name}</p>
        <p>{emp?.email}</p>
        <p>{emp?.age}</p>
        <p>{emp?.designation}</p>
      </div>
      <button onClick={handleUpdate} className=" bg-green-400 rounded-xl p-2">
        {" "}
        Update{" "}
      </button>
      <button onClick={handleDelete} className="  bg-red-400 rounded-xl p-2">
        Delete
      </button>
    </div>
  );
}

export default Employee;
