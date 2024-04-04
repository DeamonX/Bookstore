import { EyeIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef } from "react";
import { Ranking, rankings } from "@tanstack/match-sorter-utils";
import { SortingFilterHeaderModel } from "../../types/header-types";
import {
  getIndexOfSort,
  getNextSortingState,
  handleSorting,
} from "../../utils/helper-functions";
import {
  getSortingIcon,
  sortingPriorityElement,
} from "../../utils/icon-helper-functions";

export default function SortingFilterHeader<TData, TValue>({
  table,
  column,
  sortingButtonState,
}: SortingFilterHeaderModel<TData, TValue>) {
  const filterContainsWithRef = useRef<HTMLInputElement | null>(null);
  const filterStartsWithRef = useRef<HTMLInputElement | null>(null);
  const filterEqualsWithRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-row w-auto items-center">
      <span className="my-auto w-fit text-opacity-90 flex">
        {sortingButtonState.sortingButtonState.text}
      </span>
      <span
        className="flex my-auto w-fit"
        onClick={() =>
          handleSorting(
            table,
            column,
            getNextSortingState(column.getIsSorted())
          )
        }
      >
        {getSortingIcon(column.getIsSorted())}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex" asChild>
          <button>
            <Filter size={20} strokeWidth={1.25} absoluteStrokeWidth />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] h-[max] p-2" align="start">
          <DropdownMenuLabel>Mező beállítások</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              column.toggleVisibility(false);
            }}
          >
            Elrejtés
            <DropdownMenuShortcut>
              <EyeIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Szűrés</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Tartalmazza</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="inline-flex">
                    <form
                      className="flex"
                      onSubmit={(e) => {
                        e.preventDefault();
                        column.setFilterValue(
                          (
                            prevFilter:
                              | {
                                  type: Ranking;
                                  value: string;
                                }[]
                              | undefined
                          ) => {
                            if (Array.isArray(prevFilter)) {
                              return [
                                ...prevFilter,
                                {
                                  type: rankings.CONTAINS,
                                  value: filterContainsWithRef.current?.value,
                                },
                              ];
                            }
                            return [
                              {
                                type: rankings.CONTAINS,
                                value: filterContainsWithRef.current?.value,
                              },
                            ];
                          }
                        );
                        filterContainsWithRef.current!.value = "";
                      }}
                    >
                      <Input
                        className="m-2 h-[30px]"
                        ref={filterContainsWithRef}
                      />
                      <button hidden type="submit" />
                    </form>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Kezdődik</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="inline-flex">
                    <form
                      className="flex"
                      onSubmit={(e) => {
                        e.preventDefault();
                        column.setFilterValue(
                          (
                            prevFilter:
                              | {
                                  type: Ranking;
                                  value: string;
                                }[]
                              | undefined
                          ) => {
                            if (Array.isArray(prevFilter)) {
                              return [
                                ...prevFilter,
                                {
                                  type: rankings.STARTS_WITH,
                                  value: filterStartsWithRef.current?.value,
                                },
                              ];
                            }
                            return [
                              {
                                type: rankings.STARTS_WITH,
                                value: filterStartsWithRef.current?.value,
                              },
                            ];
                          }
                        );
                        filterStartsWithRef.current!.value = "";
                      }}
                    >
                      <Input
                        className="m-2 h-[30px]"
                        ref={filterStartsWithRef}
                      />
                      <button hidden type="submit" />
                    </form>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Egyelő</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="inline-flex">
                    <form
                      className="flex"
                      onSubmit={(e) => {
                        e.preventDefault();
                        column.setFilterValue(
                          (
                            prevFilter:
                              | {
                                  type: Ranking;
                                  value: string;
                                }[]
                              | undefined
                          ) => {
                            if (Array.isArray(prevFilter)) {
                              return [
                                ...prevFilter,
                                {
                                  type: rankings.MATCHES,
                                  value: filterEqualsWithRef.current?.value,
                                },
                              ];
                            }
                            return [
                              {
                                type: rankings.MATCHES,
                                value: filterEqualsWithRef.current?.value,
                              },
                            ];
                          }
                        );
                        filterEqualsWithRef.current!.value = "";
                      }}
                    >
                      <Input
                        className="m-2 h-[30px]"
                        ref={filterEqualsWithRef}
                      />
                      <button hidden type="submit" />
                    </form>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      {sortingPriorityElement(
        getIndexOfSort(column.id, table.getState().sorting)
      )}
    </div>
  );
}
