import { useTypedSelector } from '../hooks/redux'
import '../style/Header.css'

function Header (){

    const user = useTypedSelector((state) => state.user)

    return(
        <header>
            <figure>
                <img src="mainlogo.png"/>
            </figure>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Watchlist</li>
                    <li>Categories</li>
                    <li>Settings</li>
                    <li>Search</li>
                    <li>{user.firstname} {user.lastname}</li>
                    <li>Logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header