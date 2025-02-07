import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const Form = styled.form`
display: flex;
justify-content: center;
flex-direction: column;
gap: 1rem;
label {
display: block;
}
`;

const formSchema = Yup.object({

    firstname: Yup
        .string()
        .required("Bu alan zorunludur")
        .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            'Sadece latin harfleri kullanınız'
        ),

    surname: Yup
        .string()
        .required("Bu alan zorunludur")
        .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            'Sadece latin harfleri kullanınız'
        ),

    email: Yup
        .string()
        .required("Bu alan zorunludur")
        .email("Lütfen geçerli bir mail giriniz"),

    password: Yup
        .string()
        .required("Bu alan zorunludur")
        .min(8, 'Şifre en az 8 karakter uzunluğunda olmalı'),

});



export default function FormDocument() {

    const [data, setData] = useState([]);

    const initial = { firstname: '', surname: '', email: '', password: '', termsOfService: false, question: '' };
    const [person, setPerson] = useState(initial);

    const { firstname, surname, email, password, termsOfService, question } = person;

    const [buttonDisable, setButtonDisable] = useState(true);

    useEffect(() => {
        formSchema.isValid(person).then((valid) => setButtonDisable(!valid));
    }, [person]);

    const [formError, setFormError] = useState({
        firstname: "",
        surname: "",
        email: "",
        password: "",
    });


    function handleError(name, value) {

        Yup.reach(formSchema, name)
            .validate(value)
            .then(() => {
                setFormError({
                    ...formError,
                    [name]: ""
                });
            })
            .catch((error) => {
                setFormError({
                    ...formError,
                    [name]: error.errors[0]
                });
            })

    }

    function handleChange(event) {
        (event.target.name === "firstname" || event.target.name === "surname" || event.target.name === "email" || event.target.name === "password") && handleError(event.target.name, event.target.value)
        setPerson({ ...person, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value });
    }


    function submit(event) {
        event.preventDefault();
        for (let datum in person) {
            if (!person[datum]) {
                alert(`Lutfen boş alanları doldurunuz.`);
                return
            }
        }
        setData([...data, person]);

        axios.post('https://reqres.in/api/users', data)
            .then(function (response) {
                console.log(response);
                setPerson(initial);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    function reset() {
        setPerson(initial)
    }

    return (
        <Form onSubmit={submit}>
            <h2>Formu eksiksiz doldurunuz.</h2>
            <div>
                <label htmlFor="name-id">İsim</label>
                <input type="text" id="name-id" name="firstname" value={firstname} onChange={handleChange} />
                {formError.firstname !== "" && <div style={{ color: "red", display: "inline", marginLeft: "0.5rem" }}>{formError.firstname}</div>}
            </div>

            <div>
                <label htmlFor="surname-id">Soyisim</label>
                <input type="text" id="surname-id" name="surname" value={surname} onChange={handleChange} />
                {formError.surname !== "" && <div style={{ color: "red", display: "inline", marginLeft: "0.5rem" }}>{formError.surname}</div>}
            </div>

            <div>
                <label htmlFor="email-id">E-Mail</label>
                <input type="email" id="email-id" name="email" value={email} onChange={handleChange} />
                {formError.email !== "" && <div style={{ color: "red", display: "inline", marginLeft: "0.5rem" }}>{formError.email}</div>}
            </div>

            <div>
                <label htmlFor="password-id">Şifre</label>
                <input type="password" id="password-id" name="password" value={password} onChange={handleChange} />
                {formError.password !== "" && <div style={{ color: "red", display: "inline", marginLeft: "0.5rem" }}>{formError.password}</div>}
            </div>

            <div>
                <label htmlFor="checkbox-id">Kullanım Şartları</label>
                <input type="checkbox" id="checkbox-id" name="termsOfService" value="Accept" checked={termsOfService} onChange={handleChange} />
            </div>

            <div>
                Bizi nereden duydunuz?
                <label>
                    Instagram
                    <input type="radio" id="radio-id-1" name="question" value="Instagram" checked={question === "Instagram"} onChange={handleChange} />
                </label>

                <label>
                    Linkedin
                    <input type="radio" id="radio-id-2" name="question" value="Linkedin" checked={question === "Linkedin"} onChange={handleChange} />
                </label>

                <label>
                    Twitter
                    <input type="radio" id="radio-id-3" name="question" value="Twitter" checked={question === "Twitter"} onChange={handleChange} />
                </label>
            </div>

            <div>
                <button type="submit" id="submit-id" disabled={buttonDisable}>Gönder</button>
                <button type="button" id="reset-id" style={{ marginLeft: "0.5rem" }} onClick={reset}>Temizle</button>
            </div>
        </Form>
    )
}