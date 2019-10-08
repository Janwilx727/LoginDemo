// export default function emailValidation(email)
// {
//     console.log('email ', email);
//     return email.includes('@');
// };

const emailValidation = (payload) => {
    return payload.text.includes('@') && payload.text.includes('.');
}

export default emailValidation;