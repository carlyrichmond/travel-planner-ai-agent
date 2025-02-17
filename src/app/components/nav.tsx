
import logo from '../../../public/globe.svg'
import Image from "next/image";

export default function Nav() {
    return (
        <div className="nav__fixed">
            <a href="/">
                <Image
                    className="nav__logo"
                    src={logo}
                    width={50}
                    alt=""
                />
            </a>
            <h1>Travel Planner</h1>
        </div>
    );
}
