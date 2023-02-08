import styled from 'styled-components';
import { useState } from 'react';

const Form = styled.form`
display: flex;
justify-content: center;
flex-direction: column;
gap: 1rem;
label {
display: block;
}
`;



export default function FormDocument() {

    const [data, setData] = useState([]);
    const [person, setPerson] = useState({});

    function handleChange(event) {
        setPerson({ ...person, [event.target.name]: event.target.value })
        console.log(person)
    }

    function submit(event) {
        event.preventDefault();
        setData([...data, person])
        console.log(data)
    }

    function reset(event) {
        setPerson({})
        console.log(data)
    }

    return (
        <Form onSubmit={submit}>
            <h2>Formu eksiksiz doldurunuz.</h2>
            <div>
                <label htmlFor="name-id">İsim</label>
                <input type="text" id="name-id" name="name" value={person.name} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="surname-id">Soyisim</label>
                <input type="text" id="surname-id" name="surname" value={person.surname} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="email-id">E-Mail</label>
                <input type="email" id="email-id" name="email" value={person.email} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="password-id">Şifre</label>
                <input type="password" id="password-id" name="password" onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="checkbox-id">Kullanım Şartları</label>
                <input type="checkbox" id="checkbox-id" name="checkbox" onChange={handleChange} />
            </div>

            <div>
                Bizi nereden duydunuz?
                <label>
                    Instagram
                    <input type="radio" id="checkbox-1-id" name="checkbox" onChange={handleChange} />
                </label>

                <label>
                    Linkedin
                    <input type="radio" name="checkbox-2-id" onChange={handleChange} />
                </label>

                <label>
                    Twitter
                    <input type="radio" name="checkbox-3-id" onChange={handleChange} />
                </label>
            </div>

            <div>
                <button type="submit" id="submit-id">Gönder</button>
                <button type="button" id="reset-id" onClick={reset}>Temizle</button>
            </div>
        </Form>
    )
}