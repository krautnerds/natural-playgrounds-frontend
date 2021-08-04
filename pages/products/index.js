/* eslint-disable */
import React, { Component } from "react";
import Link from "next/link";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  // RangeSlider,
  ReactiveList,
  ResultCard,
} from "@appbaseio/reactivesearch";
import initReactivesearch from "@appbaseio/reactivesearch/lib/server";

const components = {
  settings: {
    app: "local",
    url: "https://paas:76b96267b10a734629c92f637cb3da93@oin-us-east-1.searchly.com",
    theme: {
      colors: {
        primaryColor: "#0d5352",
      },
    },
  },
  datasearch: {
    componentId: "SearchSensor",
    dataField: ["name"],
    autosuggest: false,
    placeholder: "Search by house names",
    iconPosition: "left",
    className: "search",
    highlight: true,
    URLParams: true,
  },

  resultcard: {
    className: "right-col",
    componentId: "SearchResult",
    dataField: "name",
    size: 12,
    render: ({ data }) => (
      <ReactiveList.ResultCardsWrapper>
        {data.map((item) => (
          <Link href={item.url} key={item.id} passHref>
            <ResultCard>
              <ResultCard.Title>{item.name}</ResultCard.Title>
              <ResultCard.Description>
                <div>
                  <p>Hello</p>
                </div>
              </ResultCard.Description>
            </ResultCard>
          </Link>
        ))}
      </ReactiveList.ResultCardsWrapper>
    ),
    pagination: true,
    URLParams: true,
    react: {
      and: ["SearchSensor"],
    },
    innerClass: {
      resultStats: "result-stats",
      list: "list",
      listItem: "list-item",
      image: "image",
    },
  },
};

export default class Main extends Component {
  static async getInitialProps({ pathname, query }) {
    return {
      store: await initReactivesearch(
        [
          {
            ...components.datasearch,
            source: DataSearch,
          },
          {
            ...components.numberbox,
            source: NumberBox,
          },
          // {
          // 	...components.rangeslider,
          // 	source: RangeSlider,
          // },
          {
            ...components.resultcard,
            source: ReactiveList,
          },
        ],
        query,
        components.settings
      ),
    };
  }

  render() {
    return (
      <div className="wide-load flex flex-col py-12">
        <ReactiveBase {...components.settings} initialState={this.props.store}>
          <nav className="nav">
            <DataSearch {...components.datasearch} />
          </nav>
          <div className="w-full flex flex-wrap">
            <div className="left-col"></div>
            <ReactiveList {...components.resultcard} />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}
