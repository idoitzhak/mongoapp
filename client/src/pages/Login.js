import React, {useState} from 'react';
import { FaUser } from 'react-icons/fa';

function Login() {

    //const [email,setEmail] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        passowrd: ''
    });

    const onChangeText = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const {email,password} = formData;

  return (
    <>  
        <section>
            <h1 className='headline'><FaUser/> Login To MarketApp</h1>
            <p>{email} {password}</p>

        </section>

        <section>
            <form>
                <div>
                    <input 
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={onChangeText}
                    />        
                </div>

                <div>
                    <input 
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Enter Your Password'
                        value={password}
                        onChange={onChangeText}
                    />        
                </div>
            </form>
        </section>
    </>
  )
}

export default Login