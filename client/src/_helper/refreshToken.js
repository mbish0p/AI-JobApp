import axios from 'axios'

const refreshToken = (error, history, responseFunction, responseObject, errorFunction) => {

    if (error.response.data.error.message === 'jwt expired') {
        console.log('jwt expired')
        axios({
            method: 'POST',
            withCredentials: true,
            url: 'http://localhost:5000/users/refresh'
        }).then((response) => {
            console.log(response)
            axios(responseObject).then((response) => {
                console.log('Access token valid')
                console.log(response)
                responseFunction(response)
            }).catch((error) => {
                console.log('Error when send second request, after validation token')
                console.log(error.response)
                errorFunction()
            })
        }).catch((error) => {
            console.log('Error when refresing token')
            console.log(error.response)
            history.push('/')
        })
    }
    console.log(error.response)
}

export default refreshToken