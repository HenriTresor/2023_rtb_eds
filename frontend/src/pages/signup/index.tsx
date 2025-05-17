import React from 'react'
import SignupForm from '../../components/forms/signup-form'

type Props = {}

function SignupPage({ }: Props) {
    return (
        <div className='w-full min-h-screen relative top-0 left-0 p-0 m-0 flex items-center justify-center'>
            <SignupForm />
        </div>
    )
}

export default SignupPage