import React, { useState, createRef, Fragment, PureComponent } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Calendar from './Calendar';


const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

// const isItemLoaded = index => !!itemStatusMap[index];
const isItemLoaded = index => itemStatusMap[index] === 2;
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 2500)
  );
};



export default function NewInfCal({ items, api, selected, setSelected, templateFormOpen, setTemplateFormOpen, events, month}) {

  
  
    return (

        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={50}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={window.innerHeight-115}
              itemCount={50}
              itemSize={817}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={window.innerWidth}
            >
              {({ index, style }) => {
                let label;
                if (itemStatusMap[index] === LOADED) {
                  label = <Calendar 
                  style={style}
                  key={index}
                  api={api}
                  i={index}
                  selected={selected}
                  setSelected={setSelected}
                  templateFormOpen={templateFormOpen}
                  setTemplateFormOpen={setTemplateFormOpen}
                  events={events}
                  month={items[index]}
                  monthList={month}
                  />
                
                } else {
                  label = "Loading...";
                }
                return (
                  <div className="ListItem" style={style}>
                    {label}
                  </div>
                );
              }}
            </List>
          )}
        </InfiniteLoader>

    );
  }