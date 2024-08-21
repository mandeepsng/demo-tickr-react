import React from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import LoginForm from './auth/LoginForm'

function LoginPage() {
  return (
    <div>
        <Header />
        <main>
            <LoginForm />
        </main>
        <Footer />
    </div>
  )
}

export default LoginPage