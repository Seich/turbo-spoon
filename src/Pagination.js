import { Link } from "react-router-dom";
import css from "./Pagination.module.scss";

export function Pagination({ currentPage, numPages }) {
  return (
    <div className={css.Pagination}>
      <nav>
        <div>
          {currentPage > 1 ? (
            <Link to={`?page=${currentPage - 1}`}>&lt;&lt; Previous Page</Link>
          ) : (
            <>&lt; &lt; Previous Page</>
          )}
        </div>

        <ul>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <li
                key={i}
                className={i + 1 === currentPage ? css.CurrentPage : undefined}
              >
                <Link to={`?page=${i + 1}`}>{i + 1}</Link>
              </li>
            ))}
        </ul>

        <div>
          {currentPage < numPages ? (
            <Link to={`?page=${currentPage + 1}`}>Next Page &gt;&gt;</Link>
          ) : (
            <>Next Page &gt;&gt;</>
          )}
        </div>
      </nav>
    </div>
  );
}
