
export const config = {
    BACKEND_HOST: process.env.REACT_APP_BACKEND_HOST,
    get TOKEN() {
        return `${this.BACKEND_HOST}/api/token/`
    }
}