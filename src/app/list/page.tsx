import React from "react";
import { getList } from "@features/list/service";
import ListItem from "@features/list/component";
import { Cart, CartEntry } from "@features/cart/model";
import { Ingredient, Ingredients } from "@core/entities/ingredients/model";
import { sortListByCategory } from "@/src/shared/lib/utils";

const List = async () => {
  const listRAW = await getList();
  const listData = JSON.parse(JSON.stringify(listRAW)) as Cart;
  const listEntry = listData[0] as CartEntry;
  const listSorted = sortListByCategory(listEntry).cart as Ingredients;
  const list = listSorted.map((c: Ingredient) => c.name);
  return list.map((l: any, i: number) => <ListItem key={i} name={l} />);
};

export default List;
