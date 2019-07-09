import React from 'react';
import { Link } from 'react-router-dom';
import { useStatefulFields, useAuthSubmit, useEnter } from './hooks';

export function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/api/register', values);

    useEnter(submit);

    return(
        <div className="regWrapper">
            <h1> Willkommen bei Littleorange </h1>
            <h2> Kostenlos Registrieren </h2>
            <p> {error} </p>
            <input
                name="first"
                placeholder="Vorname"
                onChange={handleChange}
            />
            <input
                name="last"
                placeholder="Nachnahme"
                onChange={handleChange}
            />
            <input
                name="email"
                placeholder="E-Mail"
                onChange={handleChange}
            />
            <input
                name="password"
                placeholder="Passwort (min 8 Zeichen)"
                type="password"
                onChange={handleChange}
            />
            <button onClick={() => submit()}> Weiter </button>
            <p>
                Schon einen Account? <Link to="/login"> Login </Link>
            </p>
        </div>
    );
}
