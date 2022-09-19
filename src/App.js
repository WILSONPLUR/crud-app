import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        age: 0,
        country: "",
        position: "",
        wage: 0
    })
    const [data, setData] = useState(null);
    const [newWage, setNewWage] = useState(0);
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const {age, country, position, wage, name} = formData;

    const addEmployee = () => {
        axios.post("http://localhost:4000/create", {
            name,
            age,
            country,
            position,
            wage
        }).then((res) => {
            console.log("Success", res);
            setFormData({age: 0, country: "", position: "", wage: 0, name: ""});
            getEmployees();
        })
    };
    const getEmployees = () => {
        axios.get("http://localhost:4000/employees").then((res) => {
            console.log(res);
            setData(res);
        })
    };
    const deleteEmployee = (employeeId) => {
        axios.delete(`http://localhost:4000/delete/${employeeId}`).then(() => console.log("Removed"));
        getEmployees();
    };
    const updateEmployeeInfo = (type, id) => {
        switch(type) {
            case "name":
                axios.put("http://localhost:4000/update", {name: newName, id: id}).then(() => console.log("updated"));
                getEmployees()
                break;
            case "age":
                axios.put("http://localhost:4000/update", {age: newAge, id: id}).then(() => console.log("updated"));
                getEmployees()
                break;
            case "wage":
                axios.put("http://localhost:4000/update", {wage: newWage, id: id}).then(() => console.log("updated"));
                getEmployees()
                break;
        }
    }
    useEffect(() => {
        getEmployees()
    }, []);

    return (
    <div className="App">
      <div className="form-control">
          <input placeholder="name" className="form-control__input" value={name} onChange={(e) =>  {
              setFormData({...formData, name: e.target.value})
              console.log(name);
          }} type="text" />
          <div className="form-control__input-group">
              <label className="form-control__label">Age:</label>
              <input placeholder="age" className="form-control__input" value={age} onChange={(e) => setFormData({...formData, age: Number(e.target.value)})} type="number" />
          </div>
          <input placeholder="country" className="form-control__input" value={country} onChange={(e) => setFormData({...formData, country: e.target.value})} type="text" />
          <input placeholder="position" className="form-control__input" value={position} onChange={(e) => setFormData({...formData, position: e.target.value})} type="text" />
          <div className="form-control__input-group">
              <label className="form-control__label">Wage:</label>
              <input placeholder="wage" className="form-control__input" value={wage} onChange={(e) => setFormData({...formData, wage: Number(e.target.value)})} type="number" />
          </div>
          <button className="form-control__btn" onClick={addEmployee}>
              Add employee
              <span className="material-symbols-outlined">
                    arrow_forward
              </span>
          </button>
          <br/>
          <br/>
          {data && (
              <div>
                  <table className="data-table">
                      <tr className="data-table__row">
                          <th className="data-table__th">ID:</th>
                          <th className="data-table__th">Name:</th>
                          <th className="data-table__th">Age:</th>
                          <th className="data-table__th">Country:</th>
                          <th className="data-table__th">Wage:</th>
                          <th className="data-table__th">Action: </th>
                      </tr>
                      {data.data.map((arr) => {
                              return (
                                  /*<div key={arr.id} style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      margin: "0 auto",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      border: "1px solid gray",
                                       width: "200px",
                                       marginBottom: "20px"}}>
                                      <label>{arr.name}</label>
                                      <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" placeholder="New name" />
                                      <button onClick={() => updateEmployeeInfo("name", arr.id)}>Update it</button>
                                      <label>{arr.age}</label>
                                      <input value={newAge} onChange={(e) => setNewAge(Number(e.target.value))} type="number" placeholder="New age" />
                                      <button onClick={() => updateEmployeeInfo("age", arr.id)}>Update it</button>
                                      <label>{arr.wage}</label>
                                      <input value={newWage} onChange={(e) => setNewWage(Number(e.target.value))} type="number" placeholder="New wage" />
                                      <button onClick={() => updateEmployeeInfo("wage", arr.id)}>Update it</button>
                                      <hr/>
                                      <br/>
                                      <button onClick={() => deleteEmployee(arr.id)}>Delete</button>
                                  </div>*/
                                      <tr>
                                          <td className="data-table__td">
                                              <h4>{arr.id}</h4>
                                          </td>
                                          <td className="data-table__td">{arr.name}</td>
                                          <td className="data-table__td">{arr.age}</td>
                                          <td className="data-table__td">{arr.country}</td>
                                          <td className="data-table__td">{arr.wage}</td>
                                          <td className="data-table__td">
                                              <button className="data-table__btn" onClick={() => deleteEmployee(arr.id)}>
                                                  <span className="material-symbols-outlined">
                                                    block
                                                  </span>
                                              </button>
                                          </td>
                                      </tr>
                              )
                          }
                      )}
                  </table>
              </div>
          )}
      </div>
    </div>
  );
}

export default App;
