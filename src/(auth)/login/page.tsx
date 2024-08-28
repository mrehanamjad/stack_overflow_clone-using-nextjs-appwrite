"use client";
/* - HandelSubmit Func:
i)   collect data
ii)  validate
iii) Handel loading and error
iv)  login - call from store
*/

import { useAuthStore } from '@/store/Auth'
import React from 'react'

function LoginPage() {

    const {login} = useAuthStore()
    const [error,setError] = React.useState("")
    const [loading,setLoading] = React.useState(false)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        // i)   collect data
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        // ii)  validate
        if(!email || !password) {
            setError(() => "Please fill out all the fields");
            return
        }
        
        // iii) Handel loading and error
        setLoading(() => true)
        setError(() => '')

        // iv)  login - call from store
        const response = await login(email.toString(),password.toString())
        if(response.error) setError(() => response.error!.message)
        setLoading(() => false)
    }

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage