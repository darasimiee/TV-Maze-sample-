import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <Container
      fluid
      className="d-flex justify-content-between
    align-items-center p-3 bgColorB"
    >
      <div className="d-flex gap-3 align-items-center">
        <Link to="/" className="display-6 text-white fw-bold">
          TvMaze
        </Link>
        <Link to="/tvshows" className="text-white-50">Tv shows</Link>
      </div>
      <FiSearch />
    </Container>
  );
}
