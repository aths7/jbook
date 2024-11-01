import "./add-cell.css";
import { useActions } from "../hooks/use-actions";
import { Link } from 'react-router-dom';


interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <Link to="/">
          <button
            className="button is-rounded is-primary is-small"
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>Back</span>
          </button>
        </Link>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text Editor</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};
export default AddCell;
