
export const config = {
    BACKEND_HOST: process.env.REACT_APP_BACKEND_HOST,
    get TOKEN() {
        return `${this.BACKEND_HOST}/api/token/`
    },    
    get COMPANIES() {
        return `${this.BACKEND_HOST}/api/v1/companies/`
    },
    get PROJECTS() {
        return `${this.BACKEND_HOST}/api/v2/projects/`
    },
    get USERS() {
        return `${this.BACKEND_HOST}/api/v1/users/`
    }
}