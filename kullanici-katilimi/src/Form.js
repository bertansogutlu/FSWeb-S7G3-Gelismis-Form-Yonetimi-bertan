import styled from 'styled-components';


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
    return (
        <Form>
            <div>
            <label for="name-id">İsim</label>
            <input type="text" id="name-id" name="name" />
            </div>
            
            <div>
            <label for="surname-id">Soyisim</label>
            <input type="text" id="surname-id" name="surname" />
            </div>

            <div>
            <input type="submit" value="Submit" />
            </div>
        </Form>
    )
}