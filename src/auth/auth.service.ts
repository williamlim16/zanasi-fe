import { AuthenticationEntity, AuthTokenEntity } from './auth.entity'

const login = async (data: AuthenticationEntity): Promise<AuthTokenEntity> => {

  const formBody = []
  const encodedKeyEmail = encodeURIComponent('email')
  const encodedValueEmail = encodeURI(data.email)
  formBody.push(`${encodedKeyEmail}=${encodedValueEmail}`)
  const encodedKeyPassword = encodeURIComponent('password')
  const encodedValuePassword = encodeURIComponent(data.password)
  formBody.push(`${encodedKeyPassword}=${encodedValuePassword}`)
  const finalForm = formBody.join('&')

  try {
    const res = await fetch('http://localhost:3031/auth/local/signin', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body:finalForm
    })
    const token: AuthTokenEntity = await res.json()
    return token
  }catch{
    const token: AuthTokenEntity = {
      authToken: '',
      refreshToken: ''
    }
    return token
  }
}

export default login