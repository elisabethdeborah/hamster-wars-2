import { useEffect } from "react"
import { Link } from 'react-router-dom'
import HeaderProps from "../models/HeaderProps"

const BadUrl = ({ setHeader1, setHeader2, setMobileNav}:HeaderProps) => {
	useEffect(() => {
		setHeader1('Hoppsan...')
		setHeader2('Något blev fel')
		setMobileNav(false)
	}, [setHeader1, setHeader2, setMobileNav])

	return (
		<section className="bad-url-container">
			<Link to="/"><p>Vill du gå tillbaka till startsidan?</p></Link>
		</section>
	)
}

export default BadUrl