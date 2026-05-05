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
                <div>
                    <NavLink to="/">Home</NavLink>
                    {token && <NavLink to="/dashboard">My Notes</NavLink>}
                </div>
                <div>
                    {token && <NavLink to="/createnote">Create Note</NavLink>}
                </div>
                <div>
                    {token ?
                        <button onClick={logout} className="logout">Logout</button>
                        :
                        <button onClick={login} className="logout">Login</button>
                    }
                </div>
            </nav>
        </header >
    );
}
