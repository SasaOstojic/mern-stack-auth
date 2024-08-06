import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import {toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {setCredentials} from '../src/slices/authSlice';
import { useUpdateUserMutation } from '../src/slices/usersApiSlices';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const {userInfo} = useSelector((state)=> state.auth);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.name, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        }else {
            try{
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated');
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }

    }
  return (
    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group className='my-2' controlId='name'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control placeholder='ConfirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='email'>
                <Form.Label>
                    Email address
                </Form.Label>
                <Form.Control placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>

            {isLoading && <Loader/>}
            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>

             
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen
