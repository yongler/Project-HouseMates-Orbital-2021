import { useEffect } from 'react'
import { connect } from 'react-redux'
import { checkAuthentication } from '../redux/auth/actions'

const Layout = ({ children, checkAuthentication}) => {
    useEffect(() => {
        checkAuthentication()
    }, [])

    return (
    <div>{children}</div>   
    )  
}

const mapDispatchToProps = dispatch => ({
    checkAuthentication: () => dispatch(checkAuthentication()),
})

export default connect(null, mapDispatchToProps)(Layout)
