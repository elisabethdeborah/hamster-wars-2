
import { Link } from 'react-router-dom'

const BadUrl = () => {
	return (
		<section className="bad-url-container">
			<h1>Oops ... </h1>
			<h2>Något blev fel</h2>
			<Link to="/"><p>Vill du gå tillbaka till startsidan?</p></Link>
		</section>
	)
}

export default BadUrl