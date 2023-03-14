import React from "react";
import { useReducer } from "react";

const MAILFORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const initialState = {
    firstName: {
        value: "",
        error: null,
    },
    lastName: {
        value: "",
        error: null,
    },
    email: {
        value: "",
        error: null,
    },
};

const validator = (action) => {
    const { type, payload } = action;
    switch (type) {
        case "firstName":
            if (payload.length < 2) {
                return "First name must be atleast 2 characters.";
            }
            break;
        case "lastName":
            if (payload.length < 2) {
                return "Last name must be atleast 2 characters";
            }
            break;
        case "email":
            if (!payload.match(MAILFORMAT)) {
                return "Not a valid email format.";
            }
            break;

        default:
            return null;
    }
    return null;
};

function reducer(state, action) {
    const validationError = validator(action);

    return {
        ...state,
        [action.type]: { value: action.payload, error: validationError },
    };
}

export const Form = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: name, payload: value });
    };

    return (
        <form>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" onChange={handleChange} />
                {state.firstName.error !== null && (
                    <p>{state.firstName.error}</p>
                )}
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" onChange={handleChange} />
                {state.lastName.error !== null && <p>{state.lastName.error}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email" onChange={handleChange} />
                {state.email.error !== null && <p>{state.email.error}</p>}
            </div>
            <input type="submit" value="Submit" onChange={handleChange} />
        </form>
    );
};

export default Form;
