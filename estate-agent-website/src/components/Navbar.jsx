import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import '../App.css'


export default function Navbar() {

    const repo = <FontAwesomeIcon icon={faGithub} />
    return (
        <div className="navbar flex space-between">
            <ul className="flex list space-around">
                <li className="list-item">
                    <Link to='/' className="link">HOME</Link>
                </li>
                <li className="list-item">
                    <Link to='/buyers' className="link">BUYERS</Link>
                </li>
                <li className="list-item">
                    <Link to='/sellers' className="link">SELLERS</Link>
                </li>
            </ul>
            <p className="repo-link">
                <Link to='https://github.com/SuzyQ-2117/EstateAgentMockup' title="GitHub Repo" target="_blank" className="link">{repo}</Link>
            </p>
        </div>
    )
}