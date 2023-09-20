import Home from '../pages/App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const CustomRouter = () => {
    return (
        <Router basename="/VStreamService/">
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter