import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./Consents.module.scss";

export const AvailableConsents = {
  newsletter: "Receive newsletter",
  ads: "Be shown targeted ads",
  statistics: "Contribute to anonymous visit statistics",
};

export function Consents() {
  const [consents, setConsents] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const currentPage = Number(searchParams.get("page"));

  useEffect(() => {
    document.title = "Consents";
  }, []);

  useEffect(async () => {
    const consents = await fetch(
      `/consents?page=${searchParams.get("page")}`
    ).then((res) => res.json());

    setNumPages(consents.pages);
    setConsents(consents.consents);
  }, [searchParams]);

  const renderGivenConsents = (consents) =>
    Object.entries(consents)
      .filter(([_, value]) => value)
      .map(([key, _]) => AvailableConsents[key])
      .join(", ");

  return (
    <div className={css.Consents}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Consent given for</th>
          </tr>
        </thead>
        <tbody>
          {consents.map((consent) => (
            <tr key={consent.id}>
              <td>{consent.name}</td>
              <td>{consent.email}</td>
              <td>{renderGivenConsents(consent.consents)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.Pagination}>
        <Pagination
          count={numPages}
          onChange={(_, page) => setSearchParams({ page })}
        />
      </div>
    </div>
  );
}
