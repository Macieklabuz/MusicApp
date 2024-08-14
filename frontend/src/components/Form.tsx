import { useState, FormEvent } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface FormProps {
    route: string;
    method: string;
}

function Form(props: FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const name = props.method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post(props.route, {username, password})
            if (props.method === "login") {
                localStorage.setItem("token", res.data)
                navigate("/")
            }
            else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <FormInput
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <FormInput
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <FormButton className="form-button" type="submit">
                {name}
            </FormButton>
        </FormContainer>
    );
}

export default Form;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
`;

const FormInput = styled.input`
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const FormButton = styled.button`
    width: 95%;
    padding: 10px;
    margin: 20px 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    .form-button:hover {
        background-color: #0056b3;
    }
`;