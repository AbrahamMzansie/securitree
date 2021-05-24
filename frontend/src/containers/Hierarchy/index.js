import React, { useState, useEffect } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllHierarchy } from "../../actions/hierarchyActions";
import ShowSpinner from "../../components/UI/Spinner";

import "./style.css";

const Hierarchy = () => {
  const [checked, setChecked] = useState([]);
  const [hierarchyList, setHierarchyList] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const dispatch = useDispatch();
  const hierarchy = useSelector((state) => state.hierarchy);
  useEffect(() => {
    dispatch(getAllHierarchy());
    setHierarchyList(hierarchy.hierarchies);
  }, [hierarchyList]);

  const renderHierarchies = (hierarchies) => {
    let _hierarchyList = [];
    for (let hierarchy of hierarchies) {
      _hierarchyList.push({
        label: hierarchy.name,
        value: hierarchy._id ? hierarchy._id : hierarchy.name,
        children:
          hierarchy && hierarchy.children && hierarchy.children.length > 0
            ? renderHierarchies(hierarchy.children)
            : null,
      });
    }
    return _hierarchyList;
  };

  return (
    <Layout sidebar>
      
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Manage Hierarchy</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {hierarchy.loading ? (
              <ShowSpinner />
            ) : (
              <>
                {hierarchy && hierarchy.hierarchies && (
                  <>
                    <CheckboxTree
                      style={{ fontSize: "20px" }}
                      nodes={renderHierarchies(hierarchy.hierarchies)}
                      onlyLeafCheckboxes
                      checked={checked}
                      expanded={expanded}
                      onCheck={(checked) => setChecked(checked)}
                      onExpand={(expanded) => setExpanded(expanded)}
                      icons={{
                        check: <IoIosCheckbox />,
                        uncheck: <IoIosCheckboxOutline />,
                        halfCheck: <IoIosCheckboxOutline />,
                        expandClose: <IoIosArrowForward />,
                        expandOpen: <IoIosArrowDown />,
                      }}
                    />
                    <br/>
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
    </Layout>
  );
};

export default Hierarchy;
