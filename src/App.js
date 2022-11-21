import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Employee from "./components/Employee";

const styles = {
  input: " bg-yellow-100 rounded-lg m-2 p-2 ",
};

function App() {
  const [allData, setAllData] = useState([]);
  let [counter, setCounter] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    designation: "",
  });

  useEffect(() => {
    async function fetchingAllData() {
      const res = await fetch("http://localhost:5000/alldata").then((res) =>
        res.json()
      );
      setAllData(res.Items);
    }
    fetchingAllData();
  }, [counter]);

  async function addData() {
    await axios
      .post(
        `http://localhost:5000${isUpdating ? `/update/${data.id}` : "/add"}`,
        data
      )
      .then((res) => {
        setCounter((prev) => ++prev);
      });

    setData({
      id: "",
      name: "",
      email: "",
      age: "",
      designation: "",
    });
  }

  function handleChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function funDelete(id) {
    let deleteId = id;
    await axios.delete(`http://localhost:5000/delete/${deleteId}`);
    setCounter((prev) => ++prev);
  }

  async function funUpdate(emp) {
    let updateId = emp.id;
    // const res = await axios.put(`http://localhost:5000/delete/${updateId}`);
    isUpdating
      ? setData({ id: "", name: "", email: "", age: "", designation: "" })
      : setData(emp);

    setIsUpdating((prev) => !prev);
    setCounter((prev) => ++prev);
  }
  return (
    <div className=" flex flex-col  ">
      <div className="mx-auto border p-4 ">
        <h1 className="text-3xl font-bold text-red-400 my-6 text-center">
          EMPLOYEE APP
        </h1>
        <input
          onChange={handleChange}
          className={styles.input}
          name="id"
          placeholder="Id"
          value={data.id}
          type="text"
          // disabled={isUpdating ? false: true }
        />
        <input
          onChange={handleChange}
          className={styles.input}
          placeholder="Name"
          name="name"
          value={data.name}
          type="text"
        />
        <input
          onChange={handleChange}
          className={styles.input}
          placeholder="Email"
          name="email"
          value={data.email}
          type="text"
        />
        <input
          onChange={handleChange}
          className={styles.input}
          placeholder="Age"
          name="age"
          value={data.age}
          type="text"
        />
        <input
          onChange={handleChange}
          className={styles.input}
          placeholder="Designation"
          name="designation"
          value={data.designation}
          type="text"
        />
        <button
          onClick={addData}
          className=" bg-black text-red-300 p-2 rounded-lg     "
        >
          {isUpdating ? "Update" : "Submit"}
        </button>
        <div className="flex flex-col gap-2 ">
          {allData.map((emp) => (
            <Employee
              key={emp.id}
              emp={emp}
              funDelete={funDelete}
              funUpdate={funUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
