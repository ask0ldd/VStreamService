import '../style/Header.css'

function Header (){
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
                    <li>Firstname Lastname</li>
                    <li>Logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header