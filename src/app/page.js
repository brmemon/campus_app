import Image from 'next/image'
import styles from './page.module.css'
// import "./style.scss"
import Login from './auth/Login/page'
import VerifyEmail from './auth/VerifyEmail'
export default function Home() {
  return (
    <>
    <Login />
    {/* <VerifyEmail /> */}
    </>
  )
}
