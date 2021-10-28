import Hamster from './HamsterInterface'


interface CardProps {
	hamster:Hamster;
	delete: () => void;
	showInfo: () => void;
	showDisplay: boolean;
	display: Hamster | null;
}

export default CardProps