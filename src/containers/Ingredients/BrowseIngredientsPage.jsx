import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDebounce, useFilter } from "../hooks";
import { useIntUrlParam, useUrlParam } from "../locationHooks";
import { getIngredients } from "../../data/recipe-svc";
import { map, isEmpty } from "lodash";
import { NavBar, FullPageTab, FullPageTabs, SearchBox } from "../components";
import { translate } from "../../locales/translate";

export default function BrowseRecipesPage(props) {
  const [filterValue, setFilter] = useUrlParam("filterValue", "");
  const [ingredients, setIngredients] = useState({});
  const history = useHistory();
  const [activeTabIndex, setActiveTabIndex] = useIntUrlParam("tab", 0);

  // initial load of recipes
  useEffect(function () {
    getIngredients().then(setIngredients);
  }, []);

  // filter and sort recipes by label
  const debouncedFilter = useDebounce(filterValue, 300);
  const filteredIngredients = useFilter(ingredients, debouncedFilter);

  return (
    <Fragment>
      <NavBar onBack={() => history.goBack()} />
      <FullPageTabs
        activeTabIndex={activeTabIndex}
        onTabChanged={setActiveTabIndex}
      >
        <FullPageTab icon="search" label={translate("browseIngredients.all")}>
          <div className="container p-2">
            <SearchBox
              value={filterValue}
              onChange={setFilter}
              placeholder={translate("browseIngredients.searchPlaceholder")}
            />
          </div>

          {isEmpty(ingredients) && (
            <div className="container p-2 d-flex flex-grow justify-content-center align-items-center">
              {translate("browseIngredients.noIngredients")}
            </div>
          )}
          <div className="recipe-list">
            {map(filteredIngredients, (recipe) => (
              <div className="recipe-list-item" key={recipe.id}></div>
            ))}
          </div>
        </FullPageTab>
        <FullPageTab icon="heart" label={translate("common.categories")}>
          test
        </FullPageTab>
      </FullPageTabs>
    </Fragment>
  );
}
