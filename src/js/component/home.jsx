import React, { useEffect, useState} from "react";

//create your first component
const Home = () => {

const [tarea, miTarea] = useState ("");
const [tareas, listaTareas] = useState([]);

const agregarTarea = (event) => {
    if (event.key === "Enter" && tarea !== "") {
        listaTareas(tareas.concat(tarea));
        miTarea("");
    }
};

const borrarTarea = (index) => {
    const nuevasTareas = tareas.filter(( _, i) => i !== index);
    listaTareas(nuevasTareas);
	
};

// API CODE FETCH

const createUser = (task) => {
	fetch('https://playground.4geeks.com/todo/users/pfriedmann', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({})
	})
	.then(response => {
		if(response.ok){
			getTareas()
		}
	   return response.json()
	})
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		console.error(error);
	});
	}


useEffect(()=> {
    createUser
},[])



//  LOCAL STORAGE

useEffect (() => {
	window.localStorage.setItem('mis-tareas', JSON.stringify(tareas))
}, [tareas])

useEffect (() => {
	const info = window.localStorage.getItem('mis-tareas')
	info !== null ? listaTareas(JSON.parse(info)) : ""
}, [])


	return (
		<div className="text-center">
			<h1 className="text-center">To do list</h1>
			<div>
				<input type="text" placeholder="What needs to be done?" value= {tarea} onChange= {(event)=> miTarea (event.target.value)} onKeyDown={agregarTarea} />
			</div>
			<ul>
                {tareas.map((t, index) => (
                    <li key={index}>
                        {t}
                        <span>
                            <button onClick={() => borrarTarea(index)}>x</button>
                        </span>
                    </li>
                ))}
            </ul>
			<div >
        <small> {tareas.length} items left </small>
			</div>
        </div>
    );
};

export default Home;