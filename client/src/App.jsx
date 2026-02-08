import { useEffect } from "react"
import { useState } from "react"

function App() {

  const [info, setInfo] = useState([])
  const [ilm, setIlm] = useState("")
  const [kunlikish, setKunlikIsh] = useState("")
  const [sport, setSport] = useState("")
  const [editId, setEditId] = useState(null)

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUser, setRegisteredUser] = useState(null);






  const getData = () => {
    fetch("http://localhost:3000/get_all_product")
      .then((res) => res.json())
      .then((data) => setInfo(data))
  }

  useEffect(() => {
    getData()
  }, [])

  //register
  const register = (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userName,
      email: email,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      if (data.user) {
        setRegisteredUser(data.user);
        setUserName("");
        setEmail("");
        setPassword("");
      }
    });
};



  //add product

  const addProduct = (a) => {
    a.preventDefault()
    if (!registeredUser) return alert("Avval ro'yxatdan o'ting!");
    if (editId) {
      fetch("http://localhost:3000/update_product/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ilm,
          kunlikish,
          sport,
          userName: registeredUser.name
        })
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
          getData()
          setIlm("");
          setKunlikIsh("");
          setSport("");
        })
    } else {
      fetch("http://localhost:3000/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ilm,
          kunlikish,
          sport,
          userName: registeredUser.name
        })
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
          getData()
          setIlm("");
          setKunlikIsh("");
          setSport("");
        })
    }
  }

  //delete
  const deleteProduct = (id) => {
    fetch("http://localhost:3000/delete_product/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message)
        getData()
      })
  }

  // edit
  const editProduct = (element) => {
    setIlm(element.ilm)
    setKunlikIsh(element.kunlikish)
    setSport(element.sport)
    setEditId(element.id)

  }


  return (
    <div className="container">

{/* //register */}
      <h2>Ro'yxatdan o'tish</h2>

<form onSubmit={register} className="mb-4">

  <input
    type="text"
    className="form-control mb-2"
    placeholder="Username..."
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
  />

  <input
    type="email"
    className="form-control mb-2"
    placeholder="Email..."
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    className="form-control mb-2"
    placeholder="Password..."
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button className="btn btn-dark">
    Register
  </button>

</form>







{/* add todo */}
      <h1 className="mt-3">Add Todo</h1>
      <form onSubmit={addProduct}>
        <input type="text" className="form-control mb-3" placeholder="Ilm..." value={ilm} onChange={(e) => setIlm(e.target.value)} />
        <input type="text" className="form-control mb-3" placeholder="Kunlik ish..." value={kunlikish} onChange={(e) => setKunlikIsh(e.target.value)} />
        <input type="text" className="form-control mb-3" placeholder="Sport..." value={sport} onChange={(e) => setSport(e.target.value)} />
        <button type="submit" className="btn btn-primary">{editId ? "Update" : "Add"}</button>
      </form>


      <h1 className="mt-4">
  {registeredUser && `${registeredUser.name} | `} Todo list
</h1>
      <ul>
        {
          info.length > 0 && info.map((item) => (
            <li key={item.id} className="d-flex align-items-center justify-content-between gap-3 bg-body-secondary p-3 rounded-1">
              <div className="d-flex gap-5 align-items-center">
                <h5> Ilm: {item.ilm}</h5>
                <h5> Kunlik ish: {item.kunlikish}</h5>
                <h5> Sport: {item.sport}</h5>
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-warning" onClick={() => editProduct(item)}>edit</button>
                <button className="btn btn-danger" onClick={() => deleteProduct(item.id)}>delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
