import React from 'react';
import { addTodo } from '../../tools/redux/todo/todo.action';
import { useAppContext } from '../../tools/redux/app.provider';

function Todo() {
    const { state, dispatch } = useAppContext();
    console.log("Todo.jsx -> 7: state", state  )
    const { items } = state;

    console.log("Todo.jsx -> 8: items", items  )
    return (
        <div>
            <div>
                {items.map((item, i) => (<p key={item.id}>{item.text}</p>))}
            </div>
            <button onClick={() => { dispatch(addTodo("Todo  name")) }}>Add TODO</button>
        </div>
    );
}

export default Todo;
