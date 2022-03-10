import { DataGrid } from "@mui/x-data-grid";
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
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const currentPage = Number(searchParams.get("page"));

  useEffect(() => {
    document.title = "Consents";
  }, []);

  useEffect(async () => {
    const consents = await fetch(`/consents`).then((res) => res.json());
    setConsents(consents.consents);
  }, []);

  const columns = [
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.3 },
    {
      field: "consent",
      headerName: "Consent given for",
      flex: 1,
      valueGetter: (params) =>
        Object.entries(params.row.consents)
          .filter(([_, value]) => value)
          .map(([key, _]) => AvailableConsents[key])
          .join(", "),
    },
  ];

  return (
    <div className={css.Consents}>
      <div
        style={{
          height: 250,
        }}
      >
        <DataGrid
          disableColumnMenu
          disableSelectionOnClick
          rows={consents}
          columns={columns}
          onPageChange={(page) => setSearchParams({ page: page + 1 })}
          page={currentPage - 1}
          pageSize={2}
          rowCount={consents.length}
          rowsPerPageOptions={[2]}
        />
      </div>
    </div>
  );
}
