import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";

class LinkList extends Component {
  render() {
    const { loading, error, feed } = this.props.feedQuery;
    if (loading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>Error</div>;
    }
    const linksToRender = feed.links;
    return (
      <div>
        {linksToRender.map((link, i) => (
          <Link
            key={link.id}
            updateStoreAfterVote={this._updateCacheAfterVote}
            index={i}
            link={link}
          />
        ))}
      </div>
    );
  }

  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };
}

// 1
export const FEED_QUERY = gql`
  # 2
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

// 3
export default graphql(FEED_QUERY, { name: "feedQuery" })(LinkList);
