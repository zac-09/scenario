import Header from "../../components/Header/Header";
import styles from "./home.module.css";
import { Link, NavLink } from "react-router-dom";
import sprite from "./../../assets/sprite.svg";
import IconButton from "../../components/IconButton/IconButton";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllCanvasScenarios, getCanvasScenario } from "../../store/actions/scenario";
import { notificationActions } from "../../store";
const customStyles = {
  headCells: {
    style: {
      fontSize: "1.8rem",
      "font-weight": 700,
      color: "#25bcf3",
    },
  },
};
const columns = [
  {
    name: "scenario_id",
    selector: "id",
    sortable: true,
    cell: (row) => (
      <div data-tag="allowRowEvents">
        <div style={{ fontSize: "1.3rem" }}>{row.id}</div>
      </div>
    ),
  },
  {
    name: "scenario name",
    selector: "name",
    sortable: true,
    cell: (row) => (
      <div data-tag="allowRowEvents">
        <div style={{ fontSize: "1.4rem" }}>{row.name}</div>
      </div>
    ),
  },

  {
    name: "date_created",
    selector: "createdAt",
    sortable: true,
    cell: (row) => (
      <div data-tag="allowRowEvents">
        <div style={{ fontSize: "1.4rem" }}>
          {moment(row.createdAt).format("LLL")}
        </div>
      </div>
    ),
  },
];

const CanvasList = (props) => {
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [clearSelectedRows, setClearSelectedRows] = useState(false);
  const [scenarioID, setScenarioID] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const scenarios = useSelector((state) => state.scenario.canvasScenarios);
  // const scenarios = [
  //   { scenario_name: "12", createdAt: new Date(), id: "fdffdsfds" },
  //   { scenario_name: "testing", createdAt: new Date(), id: "25" },
  // ];
  // const [scenarios, setScenarios] = useState([]);
  useEffect(() => {
    dispatch(getAllCanvasScenarios());
  }, []);
  return (
    <div className={styles["container"]}>

      <div className={styles["content"]}>
        <div
          style={{ margin: "10px", display: "flex", flexDirection: "column" }}
        >
          <div style={{ margin: "10px" }}>
            <Link to="/create-scenario">
              <IconButton label="create scenario" icon="plus" />
            </Link>
          </div>
          <div style={{ margin: "10px", marginBottom: "20px" }}>
            <Link
              onClick={async () => {
                if (!scenarioID || scenarioID === undefined) {
                  dispatch(
                    notificationActions.showAlert({
                      type: "error",
                      message: "please select scenario",
                    })
                  );
                  return;
                }
                await dispatch(getCanvasScenario(scenarioID));

                setTimeout(() => {
                  history.push(`/edit-canvasScenario/${scenarioID}`);
                }, 100);
              }}
              // to={`/edit-scenario/616d89c87785e70fb85e2b30`}
            >
              <IconButton
                label="edit scenario"
                icon="edit"
                style={styles["btn-yellow"]}
              />
            </Link>
          </div>
          <DataTable
            title=""
            columns={columns}
            data={scenarios}
            selectableRows
            selectableRowsSingle={true}
            customStyles={customStyles}
            pagination={true}
            highlightOnHover={true}
            // clearSelectedRows={clearSelectedRows}
            // expandableRows
            // onRowClicked={(data) => {
            //   console.log("clicked");
            //   setScenarioID(data);
            // }}
            highlightOnHover={true}
            keyField="device_imei"
            noDataComponent="no scenarios found "
            onSelectedRowsChange={(data) => {
              // console.log("clicked", data.selectedRows[0].id);
              if (data.selectedRows) {
                if (data.selectedRows.length > 0) {
                  setScenarioID(data.selectedRows[0].id);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasList;
