import React from 'react';
import { Link } from 'react-router-dom';
import { useStatefulFields, useAuthSubmit, useEnter} from './hooks';

export function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/api/login', values);

    useEnter(submit);

    return (
        <div className="regWrapper">
            <h1> Willkommen bei Littleorange</h1>
            <h2> Einloggen </h2>
            <p> { error } </p>
            <input
                name="email"
                placeholder="E-Mail"
                onChange={handleChange}
            />
            <input
                name="password"
                placeholder="Passwort"
                type="password"
                onChange={handleChange}
            />
            <button onClick={() => submit()}> Submit </button>
            <p>
                Noch keinen Account? <Link to="/"> Kostenlos Registrieren </Link>
            </p>
        </div>
    );
}
