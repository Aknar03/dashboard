import { useState } from 'react'
import * as classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';

const App = () => { 

    const [count, setCount] = useState<number>(0)

    const increment = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <br />
            <Link to="/ticketList">Ticket List</Link>
            <br />
            <Link to="/ticketStats">Ticket Statistics</Link>
            <h1>Number: {count}</h1>
            <button className={classes.button} onClick={increment}><span>Increment</span></button>
            <Outlet />
        </div>
    )
}

export default App