import React, { useEffect, useState} from "react";

//create your first component
const Home = () => {

const [tarea, miTarea] = useState ("");
const [tareas, listaTareas] = useState([]);

const agregarTarea = (event) => {
    if (event.key === "Enter" && tarea !== "") {
        crearTareas();
    }
};

const borrarTarea = (index) => {
    const nuevasTareas = tareas.filter(( _, i) => i !== index);
    listaTareas(nuevasTareas);
	
};

// API CODE FETCH

// const createUser = (task) => {
// 	fetch('https://playground.4geeks.com/todo/users/pfriedmann', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({})
// 	})
// 	.then(response => {
// 		if(response.ok){
// 			getTareas()
// 		}
// 	   return response.json()
// 	})
// 	.then(data => {
// 		console.log(data);
// 	})
// 	.catch(error => {
// 		console.error(error);
// 	});
// 	}
// useEffect(()=> {
//     createUser
// },[])


// NEW CODE API


const traerTareas = async () => {
 try {
	const response = await fetch("https://playground.4geeks.com/todo/users/pfriedmann", {method:"GET"})
	console.log(response);

	if (!response.ok) {
		crearUsuario ()
	} else {
		const data = await response.json ()
		console.log(data.todos);
		listaTareas (data.todos)
	}

 }catch (error) {	
}
}

const crearTareas = async () => {
	try {
		let response = await fetch("https://playground.4geeks.com/todo/todos/pfriedmann", {
			method: "POST",
			body: JSON.stringify({
				label: tarea,
				is_done: false,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.log(response.status);
			return;
		}
		let data = await response.json();
		console.log(data);
		traerTareas();
		miTarea("");
	} catch (error) {
		console.log(error);
	}
}

const crearUsuario = async ()=> {
	try {
		const response = await fetch("https://playground.4geeks.com/todo/users/pfriedmann",{method:"POST"})
		console.log(response);
		const data = await response.json ()
		if (data) {
			traerTareas ()
		}
	 } catch (error) {	
	 }
}

const borrarTareas = async (todo_id)=> {
	try {
		let response = await fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
			method: "DELETE"});
		if (!response.ok) {
			console.log(response.status);
			return;
		}
		console.log();
		traerTareas();
	} catch (error) {
		console.log(error);
	}
}

useEffect(() => {
    traerTareas();
}, []);


 ///

// //  LOCAL STORAGE

// useEffect (() => {
// 	window.localStorage.setItem('mis-tareas', JSON.stringify(tareas))
// }, [tareas])

// useEffect (() => {
// 	const info = window.localStorage.getItem('mis-tareas')
// 	info !== null ? listaTareas(JSON.parse(info)) : ""
// }, [])

	return (
		<div className="text-center">
			<h1 className="text-center">To do list</h1>
			<div>
				<input type="text" placeholder="What needs to be done?" value= {tarea} onChange= {(event)=> miTarea (event.target.value)} onKeyDown={(e)=>{agregarTarea(e)}} />
			</div>
			<ul>
                {tareas.map((t, index) => (
                    <li key={index}>
                        {t.label}
                        <span>
                            <button onClick={() => borrarTareas(t.id)}>x</button>
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