import NavProps from "../models/NavProps"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const HamsterHamburger = ({mobileNav, setMobileNav}:NavProps) => {
	return (
	mobileNav ? 
	<FontAwesomeIcon icon={faTimes} onClick={() => setMobileNav(!mobileNav)} className={"hamster-burger"}  />
	:<svg onClick={() => setMobileNav(!mobileNav)} className={"hamster-burger"} width="484" height="459" viewBox="0 0 484 459" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M454.862 352.915C413.904 416.099 333.939 459 242 459C148.589 459 67.539 414.714 27.2003 349.864L454.862 352.915ZM477.568 303.076L5.52113 299.709C1.90491 285.786 0 271.329 0 256.5C0 234.967 4.01649 214.219 11.4568 194.752L473.766 198.05C480.423 216.556 484 236.178 484 256.5C484 272.528 481.775 288.122 477.568 303.076ZM242 54C157.605 54 83.2994 90.15 39.9926 144.954L446.255 147.852C403.301 91.4278 327.874 54 242 54Z" fill="#C7CA19"/>
			<path d="M401.339 130.5L312.192 64.115L445.338 48.4999L417.338 82.4998L401.339 130.5Z" fill="#C7CA19"/>
			<path fillRule="evenodd" clipRule="evenodd" d="M72.0706 146C72.7407 134.639 71.5629 119.755 68.3576 103.764C61.6818 70.4612 48.7391 44.9734 39.4491 46.8356C30.1592 48.6978 28.04 77.2049 34.7157 110.508C37.4355 124.076 41.1956 136.347 45.3251 146H72.0706Z" fill="#4b9494d7"/>
			<path fillRule="evenodd" clipRule="evenodd" d="M440.52 147.266C447.107 138.487 453.4 126.656 458.261 113.081C469.71 81.1034 468.876 51.5583 456.397 47.0902C443.918 42.6221 424.52 64.9229 413.07 96.9004C406.23 116.005 403.774 134.241 405.566 146.781L440.52 147.266Z" fill="#4b9494d7"/>
			<path fillRule="evenodd" clipRule="evenodd" d="M85.9677 145.042L148.749 82.5625L45.575 50.324L58.473 70.0606L64.228 98.0469L65.3711 129.795L67.9039 144.837L85.9677 145.042Z" fill="#C7CA19"/>
		</svg>
	)
}

export default HamsterHamburger