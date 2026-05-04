import { NavLink, useNavigate } from "react-router-dom";
import { useToken } from "../context/AuthContext";

export default function Header() {
    const { token, setToken } = useToken();
    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    };
    const logout = () => {
        setToken(null);
    };

    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                {token ?
                    <>
                        <NavLink to="/dashboard">My Notes</NavLink>
                        <NavLink to="/createnote" style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}>Create Note</NavLink>
                        <button onClick={logout} className="logout">Logout</button>
                    </> :
                    <button onClick={login} className="logout">Login</button>
                }
            </nav>
        </header>
    );
}
