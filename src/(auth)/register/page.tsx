"use client";
/* - HandelSubmit Func:
i)   collect data
ii)  validate
iii) Handel loading and error
iv)  call the store
*/

import { useAuthStore } from "@/store/Auth";
import React, { FormEvent, useState } from "react";

function RegisterPage() {
  const { createAccount,login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // i) collect data:
    const formData = new FormData(e.currentTarget);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    // ii) validate:
    if (!firstname || !lastname || !email || !password) {
      setError(() => "Please fill out all the fields");

      return;
    }

    // iii) Handel loading and error
    setLoading(() => true);
    setError("");
    
    // iv) call the store
  const response =   await createAccount(
      `${firstname} ${lastname}`,
      email?.toString(),
      password?.toString()
    );
    
    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }

    setLoading(() => false);
  };

  return <div>{error && error }</div>;
}

export default RegisterPage;
