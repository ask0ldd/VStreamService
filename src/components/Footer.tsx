import '../style/Footer.css'
import mainLogo from '../assets/mainlogo.png'

function Footer (){

    return(
    <footer>
        <img src={mainLogo}/>
        <ul>
            <li>Terms and Privacy Notice</li>
            <li>Send us feedback</li>
            <li>Help</li>
            <li>Cookies Notice</li>
            <li>1996-2023, WatchFusion, inc</li>
        </ul>
    </footer>
    )
}

export default Footer