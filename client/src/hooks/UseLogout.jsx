
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useLogout = () => {
    let navigate = useNavigate()
    let userLoginToken = localStorage.getItem('loginToken')
  return () => {
    toast.success("Logged Out Successfully")
    localStorage.clear()
    navigate('/')
    // {
    //   !userLoginToken && navigate('/')
    // }
  }
}