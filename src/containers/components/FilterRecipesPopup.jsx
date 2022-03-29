import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "../../locales/translate";

export default function FilterRecipesPopup({
  actualFilterValues,
  onCancel,
  visible,
  onFiltersChanged,
}) {
  const classes = visible ? "visible" : "";

  return (
    <div className={`roll-up-tab ${classes} dark2`}>
      {visible && (
        <Fragment>
          <h3 className="w-100 text-center">
            {translate("filterRecipiesPopup.title")}
          </h3>

          <div className="p-2 mt-1">
            TODO
            <div className="mt-3 d-flex-column">
              <button
                className="btn btn-primary mb-1"
                type="button"
                onClick={onFiltersChanged}
              >
                {translate("common.apply")}
              </button>
              <button
                className="btn btn-light mb-1"
                type="button"
                onClick={onCancel}
              >
                {translate("common.cancel")}
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

FilterRecipesPopup.propTypes = {
  actualFilterValues: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onFiltersChanged: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
